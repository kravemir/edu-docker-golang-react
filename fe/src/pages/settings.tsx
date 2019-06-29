import * as React from "react";
import { useState } from "react";
import { connect } from "react-redux";

import { ButtonGroup, Col, Form, Row, ToggleButton } from "react-bootstrap";

function SettingsPage({ density, theme, setDensity, setTheme }) {
  const QuickToggle = ({ currentValue, setValue, value, name }) => (
    <ToggleButton
      type="radio"
      checked={currentValue === value}
      value={value}
      onChange={() => setValue(value)}
    >
      {name}
    </ToggleButton>
  );

  const DensityToggle = props => (
    <QuickToggle currentValue={density} setValue={setDensity} {...props} />
  );

  const ThemeToggle = props => (
    <QuickToggle currentValue={theme} setValue={setTheme} {...props} />
  );

  return (
    <div className="page-content container">
      <Form className="mt-4">
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Density
          </Form.Label>
          <Col sm={10}>
            <ButtonGroup toggle>
              <DensityToggle value="compact" name="Compact" />
              <DensityToggle value="cozy" name="Cozy" />
              <DensityToggle value="comfortable" name="Comfortable" />
            </ButtonGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Theme
          </Form.Label>
          <Col sm={10}>
            <ButtonGroup toggle>
              <ThemeToggle value="gray-yellow" name="Yellow on gray" />
              <ThemeToggle value="gray-blue" name="Blue on gray" />
              <ThemeToggle value="purple" name="Purple" />
            </ButtonGroup>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

const mapState = state => ({
  density: state.settings.density,
  theme: state.settings.theme
});

const mapDispatch = ({ settings }) => ({
  setDensity: val => settings.setDensity(val),
  setTheme: val => settings.setTheme(val)
});

export default connect(
  mapState,
  mapDispatch
)(SettingsPage);
