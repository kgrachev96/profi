import * as React from "react";
import "./style.scss";

export default class SwitchFormat extends React.Component<any, any> {

    render() {
        const { onChange, isPalleteActive } = this.props;
        return (
            <div className="switch-format">

                <input type="radio" value="inputs" checked={!isPalleteActive} onChange={() => onChange('inputs')} className="switch-setting active" />
                <label htmlFor="inputs">Inputs</label>

                <input type="radio" value="pallete" checked={isPalleteActive} onChange={() => onChange('pallete')} className="switch-setting not-active" />
                <label htmlFor="pallete"> Palettes</label>

            </div>
        )
    }

}