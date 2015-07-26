var LinkShortenerForm = require('../components/link-shortener-form/LinkShortenerForm.js.jsx')
var Home = React.createClass({
  render: function() {
    return (
      <div>
        <Nav />
        <div className='content-wrapper'>
          <div className='content-inner'>
            <LinkShortenerForm />
          </div>
        </div>
      </div>
    );
  }
});

window.Home = Home;