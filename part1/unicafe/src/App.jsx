import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button onClick={handleGoodClick} text={"good"} />
        <Button onClick={handleNeutralClick} text={"neutral"} />
        <Button onClick={handleBadClick} text={"bad"} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const feedbackSum = props.good + props.neutral + props.bad;
  const feedbackAvg = feedbackSum / 3;
  const feedbackAbg =
    (props.good * 1 + props.neutral * 0 + props.bad * -1) / feedbackSum;
  const feedbackPositive = parseFloat((props.good / feedbackSum) * 100);

  if (feedbackSum === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <h1>statistics</h1>
      <div>
        <table>
          <tbody>
            <StatisticLine text={"good"} value={props.good} />
            <StatisticLine text={"neutral"} value={props.neutral} />
            <StatisticLine text={"bad"} value={props.bad} />
            <StatisticLine text={"all"} value={feedbackSum} />
            <StatisticLine text={"average"} value={feedbackAvg} />
            <StatisticLine text={"positive"} value={`${feedbackPositive} %`} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
