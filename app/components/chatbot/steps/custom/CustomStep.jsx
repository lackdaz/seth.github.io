import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../common/Loading';
import CustomStepContainer from './CustomStepContainer';

class CustomStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderComponent = this.renderComponent.bind(this);
  }

  componentDidMount() {
    const { delay } = this.props;
    const { waitAction } = this.props.step;
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (!waitAction) {
          this.props.triggerNextStep();
        }
      });
    }, delay);
  }

  renderComponent() {
    const { step, steps, previousStep, triggerNextStep, handleLink, closeChatBot } = this.props;
    const { component } = step;
    return React.cloneElement(component, {
      step,
      steps,
      previousStep,
      triggerNextStep,
      handleLink,
      closeChatBot
    });
  }

  render() {
    const { loading } = this.state;
    const { style } = this.props;

    return (
      <CustomStepContainer
        className="rsc-cs"
        style={style}
      >
        { loading ? (
          <Loading />
        ) : this.renderComponent() }
      </CustomStepContainer>
    );
  }
}

CustomStep.propTypes = {
  delay: PropTypes.number.isRequired,
  step: PropTypes.object.isRequired,
  steps: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  previousStep: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  handleLink: PropTypes.func,
  closeChatBot: PropTypes.func
};

export default CustomStep;
