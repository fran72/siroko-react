import { useState } from 'react'
import Countdown, {CountdownApi} from 'react-countdown';
import './App.css'
import { FormControl, RadioGroup, FormControlLabel, Radio, FormControlLabelProps, useRadioGroup } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';



function App() {
  var radioValue0;
  var setRadioValue0 = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setSelectedOption0( () => event.target.value );
  };

  var radioValue1;
  var setRadioValue1 = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setSelectedOption1( () => event.target.value );
  };

  const [step, setStep] = useState<number>(0);
  const [date, setDate] = useState<number>(Date.now() + 60000);

  const [selectedOption0, setSelectedOption0] = useState<string>('2016');
  const [selectedOption1, setSelectedOption1] = useState<string>('Segaría a navaja');
  const [selectedWizardStep0, setSelectedWizardStep0] = useState<string>('');

  const stepOptions = [ {id: 0, title: 'PASO 1 DE 2'}, {id: 1, title: 'PASO 2 DE 2'}, {id: 2, title: 'TU PREMIO ESTÁ LISTO'} ];
  const titleOptions = [ {id: 0, title: '¡VAMOS ALLÁ!'}, {id: 1, title: 'VAMOS, UNA MÁS'}, {id: 2, title: '¡ENHORABUENA!'}, ];
  const wizardOptions = [
    {id: 0, questions: [ '2016', '2017', '2018', '2019', '2020', '2021' ]},
    {id: 1, questions: [ 'Segaría a navaja', 'Rechazaría un cachopo', 'Renunciaría a mis tierras', 'Regalaría una ternera' ]},
  ];

  const [code, setCode] = useState<string>('');
  const [countDownActivated, setCountDownActivated] = useState<boolean>(false);
  const [countDownFinished, setCountDownFinished] = useState<boolean>(false);
  
  
  const renderer = ({ minutes, seconds, completed }: { minutes: number, seconds: number, completed: boolean }) => {
    let formattedMinutes = String(minutes);
    let formattedSeconds = String(seconds);
    if (minutes < 10) { formattedMinutes = '0' + String(minutes); }
    if (seconds < 10) { formattedSeconds = '0' + String(seconds); }

    if (completed) {
      setCountDownFinished(() => true);
      return null;
    } else {
      return <span className='counter'>{formattedMinutes}:{formattedSeconds}</span>;
    }
  };

  let countdownApi: CountdownApi | null = null;
  
  const handleStartClick = (): void => { countdownApi && countdownApi.start(); };
  const handleResetClick = (): void => { setCountDownActivated(true); setDate(Date.now() + 60000); };
  const setRef = (countdown: Countdown | null): void => {
    if (countdown) { countdownApi = countdown.getApi(); }
  };

  const goToSiroko = () => { console.log('goToSiroko'); };

  function setNextStep() {
    const newStep = step + 1;
    setStep(() => newStep);

    console.log('newStep: ', newStep);
    console.log('wizardOptions[1].questions[0]: ', wizardOptions[1].questions[0]);

    if (newStep === 1) {
      setSelectedOption1(() => wizardOptions[1].questions[0]);
      setSelectedWizardStep0(() => Number(+selectedOption0[selectedOption0.length-1] + +selectedOption0[selectedOption0.length-2]).toString());
    }

    if (newStep === 2) {
      setCountDownActivated(() => true);
      var cleanedString = selectedOption1.replace(/ /g, '').replace(/a/g, '').replace(/A/g, '');
      const splittedString = cleanedString.substring(cleanedString.length - 4, cleanedString.length);
      generateCode(splittedString);
    }
    
  }

  async function copyCode () {
    try { await navigator.clipboard.writeText(code); }
    catch (err) { console.error('Error al copiar: ', err); }
  }

  function generateCode(splittedString: string) {
    const upperSelectedWizardStep1 = splittedString.toUpperCase();
    const fullCode = selectedWizardStep0 + upperSelectedWizardStep1;
    setCode(() => fullCode);
    setCountDownActivated(() => true);
    handleResetClick();
    handleStartClick();
  }

  function restart() {
    setCountDownFinished(() => false);
    setCountDownActivated(() => true);
    setDate(() => Date.now() + 60000);
    handleResetClick();
    handleStartClick();
  }

  function MyFormControlLabel(props: FormControlLabelProps) {
    const radioGroup = useRadioGroup();
  
    let checked = false;
  
    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }
  
    if (checked)
      return (
        <FormControlLabel
          sx={{
            backgroundColor: () => "#C92F58",
          }}
          checked={checked}
          {...props}
        />
      );
  
    return <FormControlLabel checked={checked} {...props} />;
  }

  

  return (
    <>

    <div className="container padding">

      <header>
        <div className="logo"></div>

        <div className="texts">
          <div className="texts-steps">{stepOptions[step].title}</div>
          <div className="texts-title">{titleOptions[step].title}</div>
          <div className={"texts-subtitle" + (step === 0 ? ' showElement' : ' hideElement')}>Has llegado hasta el test de Siroko. Responde las siguientes preguntas y genera tu código premiado a medida. </div>
        </div>
      </header>

      <main>
        <section className={step === 0 ? 'showElement' : 'hideElement'}>
          <div className="wizard">
            <div className="wizard-text">USO SIROKO DESDE...</div>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group-0"
                name="controlled-radio-buttons-group-0"
                value={radioValue0}
                onChange={setRadioValue0}
                className="wizard-radio"
                defaultValue="2016"
              >
                <MyFormControlLabel value="2016" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white', }, }} />} label="2016" />
                <MyFormControlLabel value="2017" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white', }, }} />} label="2017" />
                <MyFormControlLabel value="2018" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white', }, }} />} label="2018" />
                <MyFormControlLabel value="2019" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white', }, }} />} label="2019" />
                <MyFormControlLabel value="2020" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white', }, }} />} label="2020" />
                <MyFormControlLabel value="2021" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white', }, }} />} label="2021" />
                
              </RadioGroup>
            </FormControl>
            <div className="wizard-next" onClick={() => setNextStep()}>
              <span>Siguiente</span><ArrowRightAltIcon />
            </div>
          </div>
        </section>

        <section className={step === 1 ? 'showElement' : 'hideElement'}>
          <div className="wizard">
            <div className="wizard-text">USO SIROKO DESDE...</div>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group-1"
                name="controlled-radio-buttons-group-1"
                value={radioValue1}
                onChange={setRadioValue1}
                className="wizard-radio"
                defaultValue="Segaría a navaja"
              >
                <MyFormControlLabel value="Segaría a navaja" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white', }, }} />} label="Segaría a navaja" />
                <MyFormControlLabel value="Rechazaría un cachopo" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white', }, }} />} label="Rechazaría un cachopo" />
                <MyFormControlLabel value="Renunciaría a mis tierras" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white', }, }} />} label="Renunciaría a mis tierras" />
                <MyFormControlLabel value="Regalaría una ternera" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white', }, }} />} label="Regalaría una ternera" />
                
              </RadioGroup>
            </FormControl>
            <button className="wizard-next" onClick={() => setNextStep()}><span>Siguiente</span><ArrowRightAltIcon /></button>
          </div>
        </section>

        <section className={step === 2 ? 'showElement' : 'hideElement'}>
          <div className="wizard">
            <div className="wizard-text">LO PROMETIDO ES DEUDA</div>

            <div className="wizard-code">
              <div className="wizard-code-text">{code}</div>
              <div className="wizard-code-copy" onClick={() => copyCode()}>Copiar</div>
            </div>

            <div className="wizard-instructions">Introduce este código en tu próxima compra para conseguir tu premio. ¡Disponible durante 20 minutos!</div>

            <div className={"wizard-alarm " + (countDownFinished ? "wizard-alarm-outdated" : "")}>
              <div className="wizard-alarm-icon"> 
                <AccessAlarmIcon />
              </div>
              <div className={(countDownActivated && !countDownFinished) ? "wizard-alarm-countdown showElement" : "wizard-alarm-countdown hideElement"}>
                <Countdown ref={setRef} date={date} renderer={renderer}/>
              </div>
              <div className={(countDownActivated && countDownFinished) ? "wizard-alarm-outdated showElement" : "wizard-alarm-outdated hideElement"}>
                Codigo caducado.
                <span className="wizard-alarm-outdated-restart" onClick={() => restart()}>Reiniciar.</span>
              </div>
            </div>
            <a href="https://www.siroko.com/es/">
              <button className="wizard-next" onClick={() => goToSiroko()}><span>Ir a Siroko.com</span><ArrowRightAltIcon /></button>
            </a>
          </div>
        </section>
      </main>

    </div> 

    <footer>
      <div className="footer-text">
        <p>2016-2021 Siroko Solutions S.L.</p>
        <p>Todos los derechos reservados. <a href='https://www.siroko.com/es/'>Ver bases</a>.</p>
      </div>
    </footer>
    </>
  )
}

export default App
