import React, { Component } from "react";
import Input from "../../../components/UI/Input/Input";
import OrderSummary from "../../../components/OrderSummary/OrderSummary";
import Button from "../../../components/UI/Button/Button";
import { withRouter } from "react-router-dom";

class CheckoutForm extends Component {
  state = {
    form: {
      categories: {
        "Personal Details": {
          name: {
            inputType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Name",
            },
            value: "",
          },
          phone: {
            inputType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Mobile No.",
            },
            value: "",
          },
        },

        Delivery: {
          address_line1: {
            inputType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Address line 1",
            },
            value: "",
          },
          address_line2: {
            inputType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Address Line 2",
            },
            value: "",
          },
          pincode: {
            inputType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Pincode",
            },
            value: "",
          },
        },
        Payment: {
          paymentMethod: {
            inputType: "radio",
            value: "C",
            options: [
              {
                label: "Cash on Delivery",
                value: "C",
              },
              {
                label: "Debit/Credit Card/ UPI/ Paytm and more",
                value: "P",
              },
            ],
          },
        },
        Extra: {
          instructions: {
            inputType: "input",
            elementConfig: {
              type: "text",
              placeholder: "I like 'em spicy!",
            },
            value: "",
          },
        },
      },
    },
  };

  formSubmitHandler = (event) => {
    console.log("click");
    let form = this.state.form.categories;
    let formData = {};
    for (let catKeys in form) {
      let cat = form[catKeys];
      for (let inputKey in cat)
        formData = { ...formData, [inputKey]: cat[inputKey].value };
    }
    this.props.placeOrder(formData);
  };

  OnlinePayOrderHandler = () => {};

  inputChangedHandler = (event, inputKey, catKey) => {
    let form = Object.assign(this.state.form);
    form.categories = Object.assign(this.state.form.categories);
    form.categories[catKey] = Object.assign(this.state.form.categories[catKey]);
    form.categories[catKey][inputKey] = Object.assign(
      this.state.form.categories[catKey][inputKey]
    );
    form.categories[catKey][inputKey].value = event.target.value;

    this.setState({ form: form });
  };
  render() {
    let form = [],
      i = 1;
    for (let catKey in this.state.form.categories) {
      let inputArray = [],
        category = this.state.form.categories[catKey];

      for (let inputKey in category) {
        let input = category[inputKey];
        inputArray.push(
          <Input
            key={inputKey}
            label={inputKey}
            changed={(event) =>
              this.inputChangedHandler(event, inputKey, catKey)
            }
            {...input}
          />
        );
      }
      form.push(
        <div style={{ marginBottom: 35 }} key={catKey}>
          <h3
            style={{
              fontFamily: "Open Sans",
              color: "#FF5887",
              fontWeight: 100,
              fontSize: 14,
            }}
          >
            {i++}. {catKey}
          </h3>
          {inputArray}
        </div>
      );
    }
    return (
      <div>
        {form}
        <OrderSummary cartItems={this.props.cartItems} />
        <OrderButton
          PaymentMethod={this.state.form.categories["Payment"]["paymentMethod"]}
          formSubmitHandler={this.formSubmitHandler}
        />
      </div>
    );
  }
}

const OrderButton = (props) => {
  if (props.PaymentMethod.value === "C") {
    return (
      <Button
        clicked={props.formSubmitHandler}
        width="100%"
        style={{ width: "100%" }}
        primary
      >
        Place Order
      </Button>
    );
  } else
    return (
      <Button
        clicked={props.formSubmitHandler}
        width="100%"
        style={{ width: "100%" }}
        primary
      >
        Pay and Place Order
      </Button>
    );

  return "";
};

export default withRouter(CheckoutForm);
