import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const CoffeeIcon = props => {
  return (
    <React.Fragment>
      {props.labelText ? <label>{props.labelText}</label> : null}
      <FontAwesomeIcon
        icon={faCoffee}
        style={props.styles}
        id={props.id}
        className={props.className}
      />
    </React.Fragment>
  );
};

CoffeeIcon.propTypes = {
  labelText: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  styles: PropTypes.object
};

export default CoffeeIcon;
