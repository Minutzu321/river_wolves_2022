import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { TextareaAutosize, TextField } from '@mui/material';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const steps = [
  {
    label: 'Am fost ascultat',
    description: 'Parerile/Ideile mele au fost luate in considerare.',
  },
  {
    label: 'Am lucrat',
    description: 'Am lucrat in timpul sedintelor si nu am stat degeaba mai mult decat am lucrat.',
  },
  {
    label: 'M-am simtit bine',
    description: 'M-am simtit bine la sedintele departamentului din care fac parte.',
  },
  {
    label: 'Precizari',
    description: 'Alte precizari, imbunatatiri, idei?',
  },
]
  



function FeedbackSedinta() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [feeds, setFeeds] = React.useState({
      0:3,
      1:2,
      2:1,
      3:"",
    });

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setFeeds({
        0:3,
        1:2,
        2:1,
        3:"",
      });
    };

    function handleFeedback(inde, newVal) {
      console.log(inde,newVal);
      setFeeds({
        ...feeds,
        [inde]: newVal
      });
    }
  
    return (
    <div className="card text-center">
      <h4 className="card-title">Feedback sedinte</h4>
      <p className="card-text text-wrap">Acorda-ne un scurt feedback despre cum ti se par sedintele departamentului tau</p>
      <Box sx={{ ml: 1 }}>
        <Stepper activeStep={activeStep} orientation="vertical" connector={<QontoConnector />}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={QontoStepIcon}
                optional={
                  index === steps.length - 1 ? (
                    <Typography variant="caption">Optional</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {step.description}

                <br/>
                {index === steps.length - 1 ? <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-multiline-flexible"
          label="Altele"
          color='secondary'
          value={feeds[index]}
          onChange={(event) => {handleFeedback(index, event.target.value)}}
        /></div></Box> : <StyledRating
                                                      name="highlight-selected-only"
                                                      defaultValue={feeds[index]}
                                                      value={feeds[index]}
                                                      IconContainerComponent={IconContainer}
                                                      getLabelText={(value) => customIcons[value].label}
                                                      highlightSelectedOnly
                                                      onChange={(event, newValue) => {handleFeedback(index, newValue)}}
                                                    />}
                <br/>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      color="secondary"
                    >
                      {index === steps.length - 1 ? 'Gata' : 'Continua'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                      color="secondary"
                    >
                      Inapoi
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <div>
            <Typography>Completat</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }} color="secondary">
              Reseteaza
            </Button>
          </div>
        )}
      </Box>
    </div>
    );
}

export default FeedbackSedinta