import { useForm } from "react-hook-form";
import { WeatherData } from "../Services/GetWeather";
import "./ModalBox.css";
const ModalBox = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: "in",
      zipcode: "",
    },
  });
  const country = watch("country");
  const zipValidation = {
    in: /^[0-9]{6}$/,
    us: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
  };
  const countryName = {
    in: "India",
    us: "United States Of America",
  };
  const exisitngZipCodes = props.weatherData.map((item) => item.zipcode);

  const onSubmit = async (data) => {
    try {
      const weatherdata = await WeatherData(data);
      if(!weatherdata){
        alert("Zipcode location is not found")
        props.onHide();
        return
      }
      props.addWeatherData(weatherdata);
    } catch (error) {
      console.error(error.message);
    }
    props.onHide();
  };

  return (
    <div>
      {props.show && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-box">
            <div className="modal-header">
              <h3>Add a Location</h3>
              <span className="close-btn" onClick={props.onHide}>
                ×
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <label>Country</label>
                <input type="text" {...register("country")} disabled />

                <label>Zipcode</label>
                <input
                  type="text"
                  placeholder="Zipcode"
                  maxLength={6}
                  {...register("zipcode", {
                    required: "Zipcode is required",
                    pattern: {
                      value: zipValidation[country],
                      message: `Invalid Zipcode for ${countryName[country]}`,
                    },
                    validate: (value) =>
                      !exisitngZipCodes.includes(value) ||
                      "Zipcode already added",
                  })}
                />

                {errors.zipcode && (
                  <span className="error-text">{errors.zipcode.message}</span>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-danger"
                  onClick={props.onHide}
                >
                  Close
                </button>

                <button type="submit" className="btn-primary">
                  Add Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalBox;
