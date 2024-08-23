import AddClocker from "./components/Addclocker";
import Clocker from "./components/Clocker";

const Dashboard = () => {
  const someTestData = [
    [
      {
        dateOfStart: "",
        name:'Exercising',
        type: "clock on",
        data: [],
        goal: "",
      },
      {
        dateOfStart: "",
        name:'running time',
        type: "timer",
        data: [],
        goal: "",
      },
      {
        dateOfStart: "",
        name:'running sсhquedule',
        type: "check in",
        data: [],
        goal: "",
      },
      {
        dateOfStart: "",
        name:'Somethig',
        type: "counter",
        data: [],
        goal: "",
      },
    ],
  ];

  return (
    <div className="dashboard fileConteiner" onClick={(e) => e.stopPropagation()}>
      <Clocker />
      <AddClocker />
    </div>
  );
};

export default Dashboard;
