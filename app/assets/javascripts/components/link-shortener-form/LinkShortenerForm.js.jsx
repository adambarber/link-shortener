var classNames = require('classname');
var request = require('superagent');

var ShortedLink = React.createClass({
  onClick: function(e) {
    e.preventDefault();
    var shortenedLink = this.refs.textarea.getDOMNode();
    shortenedLink.select();
    var successful = document.execCommand('copy');
    console.log('successful', successful)
  },
  render: function() {
    return (
      <div className='shorted-link-result-wrapper'>
        <div className='shorted-link-result-inner'>
          <span className='label'>Shortened URL:</span>
          <a href={this.props.shortenedLink.shorted_url} target="_blank">
            {this.props.shortenedLink.shorted_url}
          </a>
          <textarea style={{opacity: 0, pointerEvents: 'none', position: 'absolute'}} ref='textarea'>{this.props.shortenedLink.shorted_url}</textarea>
          <button onClick={this.onClick}>Copy Link</button>
        </div>
      </div>
    );
  }
});

var FormErrors = React.createClass({
  render: function() {
    return (
      <div className='form-errors-wrapper'>
        <div className='form-errors-inner'>
          {this.props.error}
        </div>
      </div>
    );
  }
})

var LinkShortenerForm = React.createClass({
  getInitialState: function() {
    return {
      loading: false,
      error: null,
      shortenedLink: null
    };
  },
  onSubmit: function(e) {
    e.preventDefault();
    if(this.state.loading) {
      return false;
    }
    var _self = this;
    var url = this.refs.url.getDOMNode();
    this.setState({ loading: true })
    request.post('/api/links')
     .set('Content-Type', 'application/json')
     .send({url: url.value})
     .end(function(err, res) {
        if(err === null) {
          url.value = null
          _self.setState({ shortenedLink: res.body, loading: false, error: null })
        } else {
          _self.setState({ shortenedLink: null, error: res.body.errors, loading: false })
        }
     });
  },
  render: function() {
    var submitButtonClasses = classNames('submit-button', 'button', {
      loading: this.state.loading
    })
    return (
      <div className='link-shortener-form-wrapper'>
        <div className='link-shortener-form-wrapper-inner'>
          <form className='link-shortener-form' onSubmit={this.onSubmit}>
            {this.state.error ? <FormErrors error={this.state.error} /> : '' }
            <ul className='form-inputs'>
              <li>
                <div className='control-group'>
                  <input type='url' className='url-input' required='true' placeholder='http://example.com' ref='url' autoComplete="off" autoCorrect="off" autoCapitalize="off"/>
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