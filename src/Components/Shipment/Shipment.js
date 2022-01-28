import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const [loggedInUser , setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log("form submit successfully",data)
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

      {/* <input defaultValue="test" {...register("example")} /> */}
      
      <input defaultValue = {loggedInUser.name} name = "name" placeholder="Enter Your Name" {...register("name", { required: true })} />
      {errors.name && <span className="error">Name is required</span>}

      <input defaultValue = {loggedInUser.email} name = "email" placeholder="Enter Your Email" {...register("email", { required: true })} />
      {errors.email && <span className="error">Email is required</span>}

      <input name = "phone" placeholder="Enter Your Phone Number" {...register("phone", { required: true })} />
      {errors.phone && <span className="error">Phone Number is required</span>}

      <input name = "address" placeholder="Enter Your Address" {...register("address", { required: true })} />
      {errors.address && <span className="error">Address is required</span>}
      
      <input  type="submit" />
    </form>
  );
};

export default Shipment;