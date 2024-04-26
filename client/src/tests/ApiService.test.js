import SpotifyWebApi from 'spotify-web-api-js';
import apiService from '../services/ApiServices';
import jest from 'jest';
import { describe, beforeEach, afterEach, it, expect, global } from '@jest/globals';

describe('ApiService', () => {
    let spotifyApi;

    beforeEach(() => {
        spotifyApi = new SpotifyWebApi();
        apiService.setAccessToken('test-access-token');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('setAccessToken should set the access token', () => {
        expect(spotifyApi.setAccessToken).toHaveBeenCalledWith('test-access-token');
    });

    it('getArtist should return the first artist from search results', (done) => {
        const mockArtist = { id: 'test-artist-id', name: 'Test Artist' };
        spotifyApi.searchArtists.mockResolvedValueOnce({
            artists: { items: [mockArtist] },
        });

        apiService.getArtist('Test Artist', (artist) => {
            expect(artist).toEqual(mockArtist);
            done();
        });
    });

    it('getArtist2 should return the first artist from search results', async () => {
        const mockArtist = { id: 'test-artist-id', name: 'Test Artist' };
        spotifyApi.searchArtists.mockResolvedValueOnce({
            artists: { items: [mockArtist] },
        });

        const artist = await apiService.getArtist2('Test Artist');
        expect(artist).toEqual(mockArtist);
    });

    it('getArtistTracks should return the artist\'s top tracks', (done) => {
        const mockTracks = [{ id: 'test-track-1' }, { id: 'test-track-2' }];
        spotifyApi.getArtistTopTracks.mockResolvedValueOnce({ tracks: mockTracks });

        apiService.getArtistTracks('test-artist-id', (tracks) => {
            expect(tracks).toEqual(mockTracks);
            done();
        });
    });

    it('getRelatedArtists should return the artist\'s related artists', (done) => {
        const mockArtists = [{ id: 'related-artist-1' }, { id: 'related-artist-2' }];
        spotifyApi.getArtistRelatedArtists.mockResolvedValueOnce({ artists: mockArtists });

        apiService.getRelatedArtists('test-artist-id', (artists) => {
            expect(artists).toEqual(mockArtists);
            done();
        });
    });

    it('getTopArtists should return the user\'s top artists', async () => {
        const mockTopArtists = ['Artist 1', 'Artist 2', 'Artist 3'];
        spotifyApi.getMyTopArtists.mockResolvedValueOnce({
            items: mockTopArtists.slice(0, 50).map((name) => ({ name })),
        });
        spotifyApi.getMyTopArtists.mockResolvedValueOnce({
            items: mockTopArtists.slice(50, 100).map((name) => ({ name })),
        });
        spotifyApi.getMyTopArtists.mockResolvedValueOnce({
            items: mockTopArtists.slice(100).map((name) => ({ name })),
        });

        await apiService.getTopArtists((topArtists) => {
            expect(topArtists).toEqual(mockTopArtists);
        });
    });

    it('getUserId should return the user\'s ID', async () => {
        const mockUserId = 'test-user-id';
        spotifyApi.getMe.mockResolvedValueOnce({ id: mockUserId });

        const userId = await apiService.getUserId();
        expect(userId).toBe(mockUserId);
    });

    it('createPlaylist should create a new playlist for the user', async () => {
        const mockPlaylist = { id: 'test-playlist-id', name: 'Test Festival 2024' };
        spotifyApi.createPlaylist.mockResolvedValueOnce(mockPlaylist);

        const playlist = await apiService.createPlaylist('test-user-id', 'Test Festival', 'Test Festival Description');
        expect(playlist).toEqual(mockPlaylist);
        expect(spotifyApi.createPlaylist).toHaveBeenCalledWith('test-user-id', {
            name: 'Test Festival 2024',
            description: 'Test Festival Description',
            public: false,
            collaborative: true,
        });
    });

    it('addTracksToPlaylist should add tracks to the playlist', async () => {
        const mockPlaylistId = 'test-playlist-id';
        const mockTrackUris = ['track1', 'track2', 'track3'];
        spotifyApi.addTracksToPlaylist.mockResolvedValueOnce({ snapshot_id: 'test-snapshot-id' });

        await apiService.addTracksToPlaylist(mockPlaylistId, mockTrackUris);
        expect(spotifyApi.addTracksToPlaylist).toHaveBeenCalledWith(mockPlaylistId, mockTrackUris);
    });

    it('getFestival should fetch the festival lineup from the database', async () => {
        const mockFestival = { name: 'Test Festival', lineup: ['Artist 1', 'Artist 2'] };
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce([mockFestival]),
        });

        await apiService.getFestival('Test Festival', (festival) => {
            expect(festival).toEqual(mockFestival);
        });
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8888/festival', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ festivalName: 'Test Festival' }),
        });
    });
});
