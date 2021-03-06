import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../Actions/actionCreators';
import WeekHeader from '../Components/weekHeader.jsx';
import Week from '../Components/week.jsx';
import Footer from '../Components/Footer.jsx';

const mapStateToProps = store => ({
  entries: store.data.entries,
  calendar: store.data.calendar,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

class Calendar extends Component {
  componentDidMount() {
    fetch('http://localhost:3000/entry/1/2018-04-01')
      .then(res => res.json())
      .then(data => this.props.actions.syncDB(data));
  }
  render() {
    const myWeeks = [];
    for (let i = 0; i < this.props.calendar.length; i += 1) {
      myWeeks.push(<Week weeks={this.props.calendar[i]} key={i} selectDay={this.props.actions.selectEntries} />);
    }
    return (
      <div className="monthBox">
        <WeekHeader />
        { myWeeks }
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

Calendar.propTypes = {
  actions: PropTypes.shape({
    selectEntries: PropTypes.func.isRequired,
    syncDB: PropTypes.func.isRequired
  }).isRequired,
  calendar: PropTypes.shape.isRequired,

};