import { useState } from "react";

const InputExampleForm = () => {
  const [value, setValue] = useState<string>("Input value");
  const [color, setColor] = useState<string>("#0D99FF");
  const [password, setPassword] = useState<string>("password");

  return (
    <div className="col-xl-6">
      <div className="panel mb-4">
        <div className="panel-header">
          <h5>Input Example</h5>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="basicInput" className="form-label">
                Basic input
              </label>
              <input type="text" className="form-control" id="basicInput" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="inputWithPlaceholder" className="form-label">
                Input with placeholder
              </label>
              <input
                type="text"
                className="form-control"
                id="inputWithPlaceholder"
                placeholder="Placeholder"
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="inputWithValue" className="form-label">
                Input with value
              </label>
              <input
                type="text"
                className="form-control"
                id="inputWithValue"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="readonlyPlainTextInput" className="form-label">
                Readonly plain text input
              </label>
              <input
                type="text"
                className="form-control-plaintext"
                id="readonlyPlainTextInput"
                value="Readonly input"
                readOnly
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="readonlyInput" className="form-label">
                Readonly input
              </label>
              <input
                type="text"
                className="form-control"
                id="readonlyInput"
                value="Readonly input"
                readOnly
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="disabledInput" className="form-label">
                Disabled input
              </label>
              <input
                type="text"
                className="form-control"
                id="disabledInput"
                value="Disabled input"
                disabled
                readOnly
              />
            </div>

            <div className="col-sm-6">
              <label htmlFor="inputWithIcon" className="form-label">
                Input with icon
              </label>
              <div className="input-group">
                <span className="input-group-text" id="inputWithIcon">
                  <i className="fa-light fa-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@info.com"
                  aria-label="Username"
                  aria-describedby="inputWithIcon"
                />
              </div>
            </div>

            <div className="col-sm-6">
              <label htmlFor="inputWithIconRight" className="form-label">
                Input with icon right
              </label>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@info.com"
                  aria-label="Username"
                  aria-describedby="inputWithIcon2"
                />
                <span className="input-group-text" id="inputWithIcon2">
                  <i className="fa-light fa-envelope"></i>
                </span>
              </div>
            </div>

            <div className="col-sm-6">
              <label htmlFor="inputDate" className="form-label">
                Input date
              </label>
              <input type="date" className="form-control" id="inputDate" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="inputTime" className="form-label">
                Input time
              </label>
              <input type="time" className="form-control" id="inputTime" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="inputPassword" className="form-label">
                Input password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="colorPicker" className="form-label">
                Color Picker
              </label>
              <input
                type="color"
                className="form-control form-control-color w-100"
                id="colorPicker"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="datalistExample" className="form-label">
                Datalist example
              </label>
              <input
                type="text"
                className="form-control"
                list="datalistOptions"
                id="datalistExample"
              />
              <datalist id="datalistOptions">
                <option value="San Francisco" />
                <option value="New York" />
                <option value="Seattle" />
                <option value="Los Angeles" />
                <option value="Chicago" />
              </datalist>
            </div>
            <div className="col-sm-6">
              <label htmlFor="roundedInput" className="form-label">
                Rounded input
              </label>
              <input
                type="text"
                className="form-control rounded-pill"
                id="roundedInput"
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="floatingInput" className="form-label">
                Floating label
              </label>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Floating label"
                />
                <label htmlFor="floatingInput">Floating label</label>
              </div>
            </div>
            <div className="col-sm-6">
              <label htmlFor="exampleTextarea" className="form-label">
                Example textarea
              </label>
              <textarea
                className="form-control"
                id="exampleTextarea"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="panel mb-4">
        <div className="panel-header">
          <h5>File Input</h5>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="formFile" className="form-label">
                Default file input example
              </label>
              <input className="form-control" type="file" id="formFile" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="formFileMultiple" className="form-label">
                Multiple files input example
              </label>
              <input
                className="form-control"
                type="file"
                id="formFileMultiple"
                multiple
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="formFileDisabled" className="form-label">
                Disabled file input example
              </label>
              <input
                className="form-control"
                type="file"
                id="formFileDisabled"
                disabled
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="formFileSm" className="form-label">
                Small file input example
              </label>
              <input className="form-control " id="formFileSm" type="file" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="formFileLg" className="form-label">
                Large file input example
              </label>
              <input
                className="form-control form-control-lg"
                id="formFileLg"
                type="file"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="panel-header">
          <h5>Input Group</h5>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-sm-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  @example.com
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="">
                <label htmlFor="basic-url" className="form-label">
                  Your vanity URL
                </label>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon3">
                    https://example.com/users/
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                />
                <span className="input-group-text">.00</span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                />
                <span className="input-group-text">@</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Server"
                  aria-label="Server"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="input-group">
                <span className="input-group-text">With textarea</span>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InputExampleForm;
