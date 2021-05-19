"use strict";
import Component from "./Component";
import lodash from "lodash";
import data from "./data";
import * as create from "./CreateUserCard";
import * as MyMath from "./MyMath";
import "./styles.css";

// console.log(Component);
// console.log(lodash.random(1, 8));
// console.log(MyMath);
// console.log(MyMath.sum(8, 10));
// console.log(MyMath.div(9, 3), "div");
// const test = 5;
// console.log(test);
// create.createUserCard(data);

const cardContainer = document.getElementById("root");

const cardElements = data.map((user) => create.createUserCard(user));
cardContainer.append(...cardElements);
