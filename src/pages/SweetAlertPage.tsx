import { useAppSelector } from "../redux/hooks";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const SweetAlertPage = () => {
  const darkTheme = useAppSelector((state) => state.theme.isDark);
  const handleButtonClick = (alertType: string) => {
    switch (alertType) {
      case "saBasic":
        MySwal.fire({
          title: "Any fool can use a computer",
          buttonsStyling: !1,
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
            closeButton: "btn btn-sm btn-icon btn-danger",
            confirmButton: "btn btn-sm btn-primary",
          },
        });
        break;
      case "saTitle":
        MySwal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question",
          buttonsStyling: !1,
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
            closeButton: "btn btn-sm btn-icon btn-danger",
            confirmButton: "btn btn-sm btn-primary",
          },
        });
        break;
      case "saSuccess":
        MySwal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
          showCancelButton: !0,
          buttonsStyling: !1,
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
            closeButton: "btn btn-sm btn-icon btn-danger",
            confirmButton: "btn btn-sm btn-primary",
            cancelButton: "btn btn-sm btn-danger",
          },
        });
        break;
      case "saError":
        MySwal.fire({
          title: "Oops...",
          text: "Something went wrong!",
          icon: "error",
          buttonsStyling: !1,
          footer: '<a href="#">Why do I have this issue?</a>',
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
            closeButton: "btn btn-sm btn-icon btn-danger",
            confirmButton: "btn btn-sm btn-primary",
          },
        });
        break;
      case "saLongcontent":
        MySwal.fire({
          imageUrl: "https://placeholder.pics/svg/300x1500",
          imageHeight: 1500,
          imageAlt: "A tall image",
          buttonsStyling: !1,
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
            closeButton: "btn btn-sm btn-icon btn-danger",
            confirmButton: "btn btn-sm btn-primary",
          },
        });
        break;
      case "saWarning":
        MySwal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: !0,
          confirmButtonText: "Yes, delete it!",
          buttonsStyling: !1,
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
            closeButton: "btn btn-sm btn-icon btn-danger",
            confirmButton: "btn btn-sm btn-primary",
            cancelButton: "btn btn-sm btn-danger",
          },
        });
        break;
      case "saParams":
        MySwal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: !0,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          buttonsStyling: !1,
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
            closeButton: "btn btn-sm btn-icon btn-danger",
            confirmButton: "btn btn-sm btn-primary",
            cancelButton: "btn btn-sm btn-danger",
          },
        });
        break;
      case "saImage":
        MySwal.fire({
          title: "Sweet!",
          text: "Modal with a custom image.",
          imageUrl: "/logo.png",
          imageHeight: 40,
          buttonsStyling: !1,
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
            closeButton: "btn btn-sm btn-icon btn-danger",
            confirmButton: "btn btn-sm btn-primary",
          },
        });
        break;
      case "saClose":
        let timerInterval: NodeJS.Timeout | undefined;

        MySwal.fire({
          title: "Auto close alert!",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            const b = MySwal.getHtmlContainer()?.querySelector("b");
            if (b) {
              const timerLeft = MySwal.getTimerLeft();
              if (timerLeft !== undefined) {
                b.textContent = timerLeft.toString();
                timerInterval = setInterval(() => {
                  const newTimerLeft = MySwal.getTimerLeft();
                  if (newTimerLeft !== undefined) {
                    b.textContent = newTimerLeft.toString();
                  }
                }, 100);
              }
            }
          },
          willClose: () => {
            if (timerInterval) {
              clearInterval(timerInterval);
            }
          },
        }).then((result) => {
          if (result.dismiss === MySwal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        break;

      case "customHtmlAlert":
        MySwal.fire({
          title: "<i>HTML</i> <u>example</u>",
          icon: "info",
          html: 'You can use <b>bold text</b>, <a href="#">links</a> and other HTML tags',
          showCloseButton: !0,
          showCancelButton: !0,
          buttonsStyling: !1,
          confirmButtonText: '<i class="fa-light fa-thumbs-up"></i> Great!',
          cancelButtonText: '<i class="fa-light fa-thumbs-down"></i>',
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
            closeButton: "btn btn-sm btn-icon btn-danger",
            confirmButton: "btn btn-sm btn-primary",
            cancelButton: "btn btn-sm btn-danger",
          },
        });
        break;
      case "saDialogThreeBtn":
        MySwal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: !0,
          showCancelButton: !0,
          confirmButtonText: "Save",
          buttonsStyling: !1,
          denyButtonText: "Don't save",
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
            closeButton: "btn btn-sm btn-icon btn-danger",
            confirmButton: "btn btn-sm btn-primary",
            denyButton: "btn btn-sm btn-info",
            cancelButton: "btn btn-sm btn-danger",
          },
        });
        break;
      case "saPosition":
        MySwal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: !1,
          timer: 1500,
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
            closeButton: "btn btn-sm btn-icon btn-danger",
          },
        });
        break;
      case "customPaddingWidthAlert":
        MySwal.fire({
          title: "Custom width, padding, background.",
          width: 600,
          padding: 100,
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-sm btn-primary",
          },
          background: darkTheme
            ? "#242526 url(/img/bg-img/chat-bg.png)"
            : "#ffffff url(/img/bg-img/chat-bg-black.png)",
        });
        break;
      case "ajaxAlert":
        MySwal.fire({
          title: "Submit email to run ajax request",
          input: "email",
          showCancelButton: true,
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,
          buttonsStyling: false,
          showCloseButton: true,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
            closeButton: "btn btn-sm btn-icon btn-danger",
            input: "form-control form-control-sm",
            confirmButton: "btn btn-sm btn-primary",
            cancelButton: "btn btn-sm btn-danger",
          },
          preConfirm: function (email) {
            return new Promise(function (resolve, reject) {
              setTimeout(function () {
                if ("taken@example.com" === email) {
                  reject("This email is already taken.");
                } else {
                  resolve(email);
                }
              }, 2000); // Simulating AJAX request with a 2-second delay
            });
          },
          allowOutsideClick: false,
        });
        break;
      default:
        break;
    }
  };
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <div className="panel-header">
            <h5>Sweet Alert</h5>
          </div>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table sweet-alert-table">
                <thead>
                  <tr>
                    <th>Alert Type</th>
                    <th className="text-end">Alert Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>A Basic Message</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="saBasic"
                        onClick={() => handleButtonClick("saBasic")}
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>A Title with a Text Under</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="saTitle"
                        onClick={() => handleButtonClick("saTitle")}
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>A success message!</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="saSuccess"
                        onClick={() => handleButtonClick("saSuccess")}
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      A modal with a title, an error icon, a text, and a footer
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="saError"
                        onClick={() => handleButtonClick("saError")}
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>A modal window with a long content inside</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="saLongcontent"
                        onClick={() => handleButtonClick("saLongcontent")}
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      A warning message, with a function attached to the
                      "Confirm"-button
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="saWarning"
                        onClick={() => handleButtonClick("saWarning")}
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      By passing a parameter, you can execute something else for
                      "Cancel".
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="saParams"
                        onClick={() => handleButtonClick("saParams")}
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>A message with custom Image Header</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="saImage"
                        onClick={() => handleButtonClick("saImage")}
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>A message with auto close timer</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="saClose"
                        onClick={() => handleButtonClick("saClose")}
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Custom HTML description and buttons</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="customHtmlAlert"
                        onClick={() => handleButtonClick("customHtmlAlert")}
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>A dialog with three buttons</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="saDialogThreeBtn"
                        onClick={() => handleButtonClick("saDialogThreeBtn")}
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>A custom positioned dialog</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="saPosition"
                        onClick={() => handleButtonClick("saPosition")}
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>A message with custom width, padding and background</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="customPaddingWidthAlert"
                        onClick={() =>
                          handleButtonClick("customPaddingWidthAlert")
                        }
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Ajax request example</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        id="ajaxAlert"
                        onClick={() => handleButtonClick("ajaxAlert")}
                      >
                        Click Me
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SweetAlertPage;
