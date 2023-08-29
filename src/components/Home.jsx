import React, { useEffect, useRef, useState } from "react";
import {
  PageContainer,
  WorkersList,
  WorkerItem,
  ButtonAdd,
  ButtonDelete,
  ButtonReset,
  WorkerForm,
  InputGender,
  Input,
  TabList,
  ButtonTab,
  ButtonPlan,
  TaskList,
} from "./HomeStyle";
import workers from "../workers.json";

export default function Home() {
  const [workersList, setWorkersList] = useState(workers);
  const [activeTab, setActiveTab] = useState("list-of-workers");
  const [selectedGender, setSelectedGender] = useState();
  const [validWorkPlan, setValidWorkPlan] = useState(false);

  const inputNameRef = useRef();
  const inputSurnameRef = useRef();
  const workersCount = useRef(workers.length);
  const inputLengthRef = useRef();
  const inputTimeRef = useRef();
  const genderCount = useRef();

  //    Mazání jednotlivých workerů, nastavuje state pole pomocí funkce .filter, kde se propíšou pouze workeři, kteří nejsou rovni workerIdToDel, které obsahuje id workera z eventu clicknutí na mazací tlačítko
  const handleDeleteWorker = (workerIdToDel) => {
    setWorkersList(workersList.filter((worker) => worker.id !== workerIdToDel));
  };

  //    Obnova pole workerů do původního stavu, přepsáním statu obsahem původního json souboru
  const handleResetList = () => {
    setWorkersList(workers);
    inputNameRef.current.value = "";
    inputSurnameRef.current.value = "";
  };

  //    Přidávání nových pracovníků, pokud jsou vyplněné inputy pro jméno, příjmení a vybrané pohlaví
  const handleAddWorker = () => {
    if (
      inputNameRef.current.value.trim().length > 0 &&
      inputSurnameRef.current.value.trim().length > 0 &&
      selectedGender
    ) {
      setWorkersList((workersList) => {
        return [
          ...workersList,
          {
            id: workersCount.current,
            name: inputNameRef.current.value,
            surname: inputSurnameRef.current.value,
            gender: selectedGender,
          },
        ];
      });
      workersCount.current++;
      console.log(inputNameRef.current.value, workersList);
    } else alert("Please make sure to enter worker's name, surname and gender");
  };

  //    Zobrazování a ovládání tlačítka pro potvrzení práce, podle dostatečnosti lidské síly
  const handleInputPlan = () => {
    let availableManpower = genderCount.current.mens;
    availableManpower += genderCount.current.womens / 2;
    const requiredManpower =
      inputLengthRef.current.value / inputTimeRef.current.value;
    availableManpower >= requiredManpower
      ? setValidWorkPlan(true)
      : setValidWorkPlan(false);
  };

  //    Upozornění při úspěšném naplánování práce
  const handleWorkPlan = () => {
    if (validWorkPlan) alert("Work planned successfully!");
  };

  //    Při změně stavu pole s workery dojde k přepočtení počtu žen a mužů v poli pro jejich zobrazení na stránce a pro výpočet plánu práce
  useEffect(() => {
    let mens = 0;
    let womens = 0;
    workersList.map((worker) => {
      if (worker.gender === "MEN") {
        mens++;
      } else if (worker.gender === "WOMEN") {
        womens++;
      }
    });
    genderCount.current = { mens: mens, womens: womens };
    clearInputs();
  }, [workersList]);

  //    Vymazání inputů pro name a surname po přidání workera
  const clearInputs = () => {
    inputNameRef.current.value = "";
    inputSurnameRef.current.value = "";
  };

  return (
    <PageContainer>
      <TabList>
        <ButtonTab
          name="list-of-workers"
          data-active={activeTab}
          onClick={() => setActiveTab("list-of-workers")}
        >
          List of Workers
        </ButtonTab>
        <ButtonTab
          name="plan-work"
          data-active={activeTab}
          onClick={() => setActiveTab("plan-work")}
        >
          Task
        </ButtonTab>
      </TabList>

      {activeTab === "list-of-workers" && (
        <>
          <WorkersList>
            {workersList.map((worker) => (
              <WorkerItem key={worker.id}>
                {worker.name} {worker.surname} - <span>{worker.gender}</span>{" "}
                <ButtonDelete
                  onClick={() => {
                    handleDeleteWorker(worker.id);
                  }}
                >
                  X
                </ButtonDelete>
              </WorkerItem>
            ))}
          </WorkersList>
          <WorkerForm>
            <Input ref={inputNameRef} type="text" placeholder="Name" />
            <Input ref={inputSurnameRef} type="text" placeholder="Surname" />
            <InputGender>
              <label>
                <Input
                  type="radio"
                  name="gender"
                  value="MEN"
                  onChange={() => setSelectedGender("MEN")}
                />
                MEN
              </label>
              <label>
                <Input
                  type="radio"
                  name="gender"
                  value="WOMEN"
                  onChange={() => setSelectedGender("WOMEN")}
                />
                WOMEN
              </label>
            </InputGender>
            <ButtonAdd onClick={handleAddWorker}>Add Worker</ButtonAdd>
          </WorkerForm>
          <ButtonReset onClick={handleResetList}>
            Reset do původního stavu
          </ButtonReset>
        </>
      )}

      {activeTab === "plan-work" && (
        <TaskList>
          <h3>Planning excavation works</h3>
          <p>
            <i>
              Men - 1m/hr <br />
              Women - 0.5m/hr
            </i>
          </p>
          <p>Men: {genderCount.current.mens}</p>
          <p>Women: {genderCount.current.womens}</p>
          <Input
            ref={inputLengthRef}
            type="number"
            min="1"
            placeholder="Enter meters..."
            onChange={handleInputPlan}
          ></Input>
          <Input
            ref={inputTimeRef}
            type="number"
            min="1"
            placeholder="Enter hours..."
            onChange={handleInputPlan}
          ></Input>
          <ButtonPlan disabled={!validWorkPlan} onClick={handleWorkPlan}>
            Plan work
          </ButtonPlan>
        </TaskList>
      )}
    </PageContainer>
  );
}
