import React, { CSSProperties } from "react";

export type formPropsType = {
  onSubmit: () => void;
  feilds: {
    label: string;
    inputAttrs: {
      type: string;
      required: boolean;
      placeholder: string;
      onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    };
  }[];
};

const Form: React.FC<formPropsType> = (props: formPropsType) => {

  const inputStyles: CSSProperties = {
    marginTop: "1rem",
    marginBottom: "1rem",
    height: "24px",
    width: "300px",
    position: "relative",
    bottom: "0.1rem",
    fontSize: "18px",
  };

  const formStyles: CSSProperties = {
    display: "block",
    margin: "1rem",
    paddingLeft: "1rem",
  };

  const containerStyles: CSSProperties = {
    margin: "1rem",
    textAlign: "left",
    fontSize: "24px",
  };

  const submitButtonStyle: CSSProperties = {
    fontSize: "20px",
    marginBottom: "1rem",
  };

  return (
    <div style={containerStyles}>
      <form style={formStyles}>
        {props.feilds.map((f, i) => (
          <div key={i}>
            <label>{f.label}</label>
            <input
              type={f.inputAttrs.type}
              placeholder={f.inputAttrs.placeholder}
              onChange={f.inputAttrs.onChange}
              required={f.inputAttrs.required}
              style={inputStyles}
            />
          </div>
        ))}
        <input
          style={submitButtonStyle}
          onClick={props.onSubmit}
          type="submit"
        />
      </form>
    </div>
  );
};

export default Form;
