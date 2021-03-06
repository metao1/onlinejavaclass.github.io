import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { debounce } from './../utils/Timer.js';
import Spinner from './../components/Spinner.jsx';

export default class ExperimentsHandler extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.setSearchQuery = this.setSearchQuery.bind(this);
  }

  componentWillMount () {
    let that = this;
    this.handleSearchDebounced = debounce(function () {
      this.handleSearch.apply(that, [this.state.query]);
    }, 500);
  }

  handleChange (event) {
    let query = event.target.value;
    this.setState({query: query});
    this.handleSearchDebounced();
  }

  handleSearch (query) {
    this.context.router.transitionTo('/search/'+query);
  }

  setSearchQuery(query) {
    this.setState({query: query});
  }

  render() {
    return <div className="content">
      <div className="search">
        <div className="search-wrap-1">
          <input type="text" value={this.state.query} onChange={this.handleChange} placeholder="Search in experiments"/>
        </div>
      </div>
      <section>
            <ul className="menu with-search">
              <li className="item">
               <Link to="experimentarchive" activeClassName="active">
                <i className="fap fap-archive"/>
                <div className="text">Archive</div>
               </Link>
              </li>
              <li className="item">
               <Link to="experimenttags" activeClassName="active">
                <i className="fap fap-tags"/>
                <div className="text">Tags</div>
               </Link>
              </li>
            </ul>

           <RouteHandler setSearchQuery={this.setSearchQuery}/>

      </section>
    </div>;
  }
}

ExperimentsHandler.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
