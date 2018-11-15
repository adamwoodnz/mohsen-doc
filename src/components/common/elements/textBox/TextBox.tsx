import * as React from "react";
import "./textBox.scss";

export interface TextBoxProps {
    value: string | number;
    onChange: (event: any) => void;
    name: string;
    type?: string;
    label?: string;
    error?: string;
    currency?: string;
    placeHolder?: string;
    className?: string;
    focus?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    max?: number;
    autoComplete?: boolean;
}

export const TextBox: React.StatelessComponent<TextBoxProps> = (props: TextBoxProps): React.ReactElement<void> => {
    let wrapperClass: string = "form-group input-box";
    if (props.className) { wrapperClass += ` ${props.className}`; }

    return (
        <div className={wrapperClass}>
            {props.currency && <span className="currency">{props.currency}</span>}
            <div className="input-field">
                {props.label && <label htmlFor={props.name}>{props.label}</label>}
                <input
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeHolder}
                    className={"form-control " + (props.error ? "error" : "")}
                    autoFocus={props.focus}
                    autoComplete={props.autoComplete ? "on" : "off"}
                    readOnly={props.readonly}
                    disabled={props.disabled}
                    maxLength={props.max}
                />
            </div>
        </div>
    );
};
