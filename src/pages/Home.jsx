import FirstScreen from '../components/HomeComp/FirstScreen';
import SecondScreen from '../components/HomeComp/SecondScreen';
import ThirdScreen from '../components/HomeComp/ThirdComp';

function Home() {
  return (
    <div className="container">
      <FirstScreen />
      <SecondScreen />
      <ThirdScreen />
    </div>
  );
}

export default Home;
