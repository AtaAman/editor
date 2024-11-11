
import GrapesEditor from './Editor';
import './App.css';
import ProposalChart from './chart.jsx';
// import DemoTemplate from './DemoTemplate.jsx';

function App() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <GrapesEditor />
      <ProposalChart/>
      {/* <DemoTemplate/> */}
    </div>
  );
}

export default App;
