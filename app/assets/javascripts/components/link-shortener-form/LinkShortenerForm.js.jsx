var classNames = require('classname');
var request = require('superagent');

var ShortedLink = React.createClass({
  render: function() {
    return (
      <div className='shorted-link-result-wrapper'>
        <div className='shorted-link-result-inner'>
          {this.props.shortenedLink.slug}
        </div>
      </div>
    );
  }
})

var LinkShortenerForm = React.createClass({
  getInitialState: function() {
    return {
      loading: false,
      shortenedLink: null
    };
  },
  onSubmit: function(e) {
    e.preventDefault();
    var _self = this;
    var url = this.refs.url.getDOMNode();
    this.setState({ loading: true })
    request.post('/api/links')
     .set('Content-Type', 'application/json')
     .send({url: url.value})
     .end(function(err, res) {
        if(err === null) {
          _self.setState({ shortenedLink: res.body, loading: false })
        }
     });
  },
  render: function() {
    console.log('state', this.state)
    var submitButtonClasses = classNames('submit-button', 'button', {
      loading: this.state.loading
    })
    return (
      <div className='link-shortener-form-wrapper'>
        <div className='link-shortener-form-wrapper-inner'>
          <form className='link-shortener-form' onSubmit={this.onSubmit}>
            <ul className='form-inputs'>
              <li>
                <div className='control-group'>
                  <input type='url' className='url-input' placeholder='http://example.com' ref='url' autoComplete="off" autoCorrect="off" autoCapitalize="off"/>
                  <input type='submit' className={submitButtonClasses} value='Shorten Link' />
                </div>
                <span className='help-text'>
                  Paste a link in the box above to get a shortened link.
                </span>
              </li>
            </ul>
          </form>
        </div>
        {this.state.shortenedLink ? <ShortedLink shortenedLink={this.state.shortenedLink} /> : ''}
      </div>
    );
  }
});

module.exports = LinkShortenerForm;