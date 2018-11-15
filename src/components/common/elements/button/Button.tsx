import * as React from "react";
import "./button.scss";

export interface IconType {
    type: string;
    category: string;
    position: string;
}

export interface ButtonProps {
    label: string;
    onClick: (event: any) => void;
    className?: string;
    disabled?: boolean;
    theme?: string;
    icon?: IconType;
}

export const Button: React.StatelessComponent<ButtonProps> = (props: ButtonProps): React.ReactElement<void> => {
    const theme: string = !props.theme ? "btn-primary" : `btn-${props.theme}`;
    return (
        <button
            type="button"
            disabled={props.disabled}
            className={`btn ${theme} custom-button ${props.className ? props.className : ""}`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => { props.onClick && props.onClick(e); }}
        >
            {(props.icon && props.icon.category && props.icon.type) &&
                <i className={`custom-icon-${props.icon.position} ${props.icon.category} fa-${props.icon.type}`} />
            }
            <span>{props.label}</span>
        </button>
    );
};
