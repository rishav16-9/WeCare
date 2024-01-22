const validate = (name, value) => {
  switch (name) {
    case "name":
      if (value.length === 0) {
        return "Name is required";
      }
      return "";
    case "password":
      if (value.length === 0) {
        return "Password is required";
      }
      return "";
    case "id":
      if (value.length === 0) {
        return "ID is required";
      }
      return "";
    case "dateOfBirth":
      let getAge = (value) => {
        var today = new Date();
        var birthDate = new Date(value);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };
      if (!value) {
        return "Date of birth is required";
      }
      if (getAge(value) < 18 || getAge(value) > 100) {
        return "To register must be greater than 18";
      }
      return "";
    case "gender":
      if (!value) {
        return "Gender is required";
      }
      return "";
    case "mobileNumber":
      if (value.length === 0) {
        return "Mobile number is required";
      }
      return "";
    case "speciality":
      if (value.length === 0) {
        return "Speciality is required";
      }
      return "";
    default:
      return "";
  }
};

export default validate;
