import { Children, useState, ReactElement } from 'react'
import { Form, Formik, FormikConfig, FormikValues } from 'formik'
import { makeStyles, withStyles } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Check from '@material-ui/icons/Check'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  StepConnector,
  Box
} from '@material-ui/core'

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#00796B',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#00796B',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector)

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#00796B',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#00796B',
    zIndex: 1,
    fontSize: 18,
  },
})

function QontoStepIcon(props: any) {
  const classes = useQontoStepIconStyles()
  const { active, completed } = props

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  )
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const childrenArray = Children.toArray(children) as ReactElement<FormikStepProps>[]
  const [step, setStep] = useState(0)
  const currentChild = childrenArray[step]
  const [completed, setCompleted] = useState(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  function isLastStep() {
    return step === childrenArray.length - 1
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild?.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers)
          setCompleted(true)
        } else {
          setStep((s) => s + 1)
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form autoComplete="off">
          <Box my="1rem">
            <Stepper
              alternativeLabel
              activeStep={step}
              connector={<QontoConnector />}>
              {childrenArray.map((child, index) => (
                <Step
                  key={child.props.label}
                  completed={step > index || completed}>
                  <StepLabel StepIconComponent={QontoStepIcon}>
                    {currentChild.props.label === child.props.label && child.props.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box my="1rem">
              {currentChild}
            </Box>

            {(Object.values(errors).indexOf('A radio option is required') > -1) && !!touched && (
              <Snackbar
                open={true}
                autoHideDuration={6000}>
                <Alert severity="error">
                  A radio option is required!
              </Alert>
              </Snackbar>
            )}
          </Box>

          <Box
            display="flex"
            flexDirection="row-reverse"
            gap="1rem"
            flexWrap="wrap"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            position="absolute"
            bottom="0"
            py="2rem"
            px="1rem"
            >
            <Button
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              fullWidth={!matches}
              type="submit">
              {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
            </Button>

            {step > 0 ? (
              <Button
                disabled={isSubmitting}
                variant="outlined"
                color="secondary"
                fullWidth={!matches}
                onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            ) : null}
          </Box>
        </Form>
      )}
    </Formik>
  )
}