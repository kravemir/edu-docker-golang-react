import * as React from "react";
import { useState } from "react";

import { ButtonGroup, Col, Form, Row, ToggleButton } from "react-bootstrap";

function SettingsPage() {
  const [density, setDensity] = useState("comfortable");
  const [theme, setTheme] = useState("gray-yellow");

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
    <div className="page-content">
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <ButtonGroup toggle className="mt-3">
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

export default SettingsPage;
