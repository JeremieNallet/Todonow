import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

//Store
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const StatisticsTime = ({ dataBase, userId, localData, guestUser }) => {
    let empty;
    if (guestUser) {
        empty = localData.length === 0;
    } else {
        empty = !dataBase || !dataBase[userId] || dataBase[userId].task.length === 0;
    }

    return (
        <div className="stats-time">
            {empty ? (
                <div className="stats-time__header empty">
                    <span>Your todo list is empty</span>
                </div>
            ) : (
                <div className="stats-time__header">
                    <span>Time spend per todos</span>
                </div>
            )}
            <div className="stats-time__list">
                {!empty
                    ? dataBase[userId].task.map(task => (
                          <div key={task.id} className="item">
                              <div className="container">
                                  <div
                                      style={{
                                          background: task.completed
                                              ? 'var(--color-red)'
                                              : 'var(--primary-color)'
                                      }}
                                      className="item__indicator"
                                  >
                                      {task.title.charAt(0).toUpperCase()}
                                  </div>
                                  <div className="item__text">
                                      <div className="item__text--name">{task.title}</div>
                                      <div className="item__text--time">
                                          Time spent : {moment(task.time * 1000).format('mm:ss')}
                                          s
                                      </div>
                                  </div>
                              </div>
                              <div className="item__state">
                                  {task.completed ? 'Completed' : 'In progress'}
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};

StatisticsTime.propTypes = {
    tasks: PropTypes.object,
    userId: PropTypes.string
};

const mapStateToProps = ({ firebase, firestore, task, auth }) => ({
    dataBase: firestore.data.tasks,
    userId: firebase.auth.uid,
    guestUser: auth.guestUser,
    localData: task.tasks
});

const mapDispatchToProps = {};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [`tasks/${props.userId}`])
)(StatisticsTime);
