import React, { Component } from "react";
import ItemCategory from "../../components/Item/ItemCategory/ItemCategory";
import { connect } from "react-redux";
import { mapStateToFoodItems } from "../../store/mapFunctions";

class Home extends Component {
  state = {};
  render() {
    const GymItems = this.props.items.filter((item) => item.category === "GY");
    const BreakfastItems = this.props.items.filter(
      (item) => item.category === "BR"
    );

    return (
      <div className={"Wrapper"}>
        <ItemCategory name="Gym" items={GymItems} />
        <ItemCategory name="BreakFast" items={BreakfastItems} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: mapStateToFoodItems(state),
  };
};

export default connect(mapStateToProps, null)(Home);
