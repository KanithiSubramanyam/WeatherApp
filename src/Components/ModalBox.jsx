import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import  { WeatherData } from "../Services/GetWeather"
const ModalBox = (props) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      country: "in",
      zipcode: "",
    },
  });
  const country = watch("country");
  const zipValidation = {
    "in": /^[0-9]{6}$/,
    "us": /(^\d{5}$)|(^\d{5}-\d{4}$)/,
  };
  const countryName = {
    in: "India",
    us: "United States Of America",
  };
  const exisitngZipCodes = props.weatherData.map(item => item.zipcode);

  const onSubmit = async(data) => {
    try{
        const weatherdata = await WeatherData(data);
        props.addWeatherData(weatherdata)
    }
    catch(error){
        console.error(error.message);
    } 
    props.onHide();
  };

  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.onHide}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a Location</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <input
              type="text"
              {...register("country")}
              disabled
              className="form-control mb-3"
            />

            <input
              type="text"
              placeholder="Zipcode"
              {...register("zipcode", {
                required: "Zipcode is required",
                pattern: {
                  value: zipValidation[country],
                  message: `Invalid Zipcode for ${countryName[country]}`,
                },
                validate : (value) => !exisitngZipCodes.includes(value) || "Zipcode already added",

              })} 
              className="form-control" maxLength={6}
            />

            {errors.zipcode && (
              <div className="text-danger mt-2">{errors.zipcode.message}</div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Add Location
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalBox;
