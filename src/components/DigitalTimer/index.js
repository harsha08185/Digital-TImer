import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timerLimit: 25,
      timeLeft: 1500,
      isRunning: false,
    }

    this.timerId = null

    this.decreseTimer = () => {
      const {timeLeft} = this.state
      this.setState(
        prevState => ({
          timeLeft: Math.max(prevState.timeLeft - 1, 0),
        }),
        () => {
          if (timeLeft === 0) {
            clearInterval(this.timerId)
            this.timerId = null
            this.setState({isRunning: false})
          }
        },
      )
    }

    this.onReset = () => {
      clearInterval(this.timerId)
      this.timerId = null

      this.setState({
        timerLimit: 25,
        timeLeft: 1500,
        isRunning: false,
      })
    }

    this.startPause = () => {
      const {isRunning, timeLeft, timerLimit} = this.state

      if (isRunning) {
        clearInterval(this.timerId)
        this.timerId = null
        this.setState({isRunning: false})
      } else {
        const startingTime = timeLeft === 0 ? timerLimit * 60 : timeLeft

        this.setState(
          {
            timeLeft: startingTime,
            isRunning: true,
          },
          () => {
            this.timerId = setInterval(this.decreseTimer, 1000)
          },
        )
      }
    }

    this.decreaseLimit = () => {
      this.setState(prevState => {
        if (prevState.timerLimit <= 1) {
          return null
        }

        return {
          timerLimit: prevState.timerLimit - 1,
          timeLeft: prevState.timeLeft - 60,
        }
      })
    }

    this.increaseLimit = () => {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit + 1,
        timeLeft: prevState.timeLeft + 60,
      }))
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  render() {
    const {timerLimit, timeLeft, isRunning} = this.state
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return (
      <div>
        <h1>Digital Timer</h1>
        <div>
          <img src="https://assets.ccbp.in/frontend/react-js/digital-timer-elapsed-bg.png" />
          <div>
            <img
              src={
                isRunning
                  ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
              }
              alt={isRunning ? 'pause icon' : 'play icon'}
            />
            <h1>
              {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
                2,
                '0',
              )}`}
            </h1>
            <p>{isRunning ? 'Running' : 'Paused'}</p>
          </div>
          <div>
            <button onClick={this.startPause}>
              <p>{isRunning ? 'Pause' : 'Start'}</p>
            </button>
          </div>
          <button onClick={this.onReset}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
            />
            <p>Reset</p>
          </button>
          <div>
            <p>Set Timer limit</p>
            <button onClick={this.decreaseLimit} disabled={isRunning}>
              -
            </button>
            <p>{timerLimit}</p>
            <button onClick={this.increaseLimit} disabled={isRunning}>
              +
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
