function Search({searchSubmit, searchHandler, searchName}) {

  return (
    <div className="Login">

      <div className="login-container">
      <div className="festify-title-container">
        <h1 className="festify-title" >festify</h1>
        </div>
        
        <div className="login-text-container">
        <h2>step 2</h2>
        <h3>enter a festival name</h3>
        <div id="search-container">
          <form onSubmit={searchSubmit}>
            <input type="text" value={searchName} onChange={searchHandler} placeholder="SEARCH"></input>
          </form>
          </div>
          </div>
      </div>


    </div>
  )
}

export default Search
