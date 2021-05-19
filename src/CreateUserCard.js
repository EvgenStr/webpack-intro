"use strict";
const socialOptions = {
  "www.facebook.com": "fa-facebook-f",
  "twitter.com": "fa-twitter",
  "www.instagram.com": "fa-instagram",
};
export function createUserCard(user) {
  return createElement(
    "li",
    { classNames: ["cardWrapper"] },
    createElement(
      "article",
      { classNames: ["cardContainer"] },
      createImageWrapper(user),
      createContentWrapper(user)
    )
  );
}

/**
 * @param {string} tagName
 * @param {object} options
 * @param {string[]} options.classNames - css classes
 * @param {object} options.handlers - event handlers
 * @param {object} options.attributes - attributes
 * @param  {...Node} children
 * @returns {HTMLElement}
 */
export function createElement(
  tagName,
  { classNames = [], handlers = {}, attributes = {} } = {},
  ...children
) {
  const elem = document.createElement(tagName);
  elem.classList.add(...classNames);

  for (const [attrName, attrValue] of Object.entries(attributes)) {
    elem.setAttribute(attrName, attrValue);
  }

  for (const [eventType, eventHandler] of Object.entries(handlers)) {
    elem.addEventListener(eventType, eventHandler);
  }

  elem.append(...children);
  return elem;
}

function createCardImage(link) {
  const img = createElement("img", {
    classNames: ["cardImage"],
    handlers: {
      error: handleImageError,
      load: handleImageLoad,
    },
  });
  img.src = link;
  img.hidden = true;

  return img;
}
function createImageWrapper({ firstName, lastName, profilePicture }) {
  const imageWrapper = createElement(
    "div",
    {
      classNames: ["cardImageWrapper"],
    },
    createElement(
      "div",
      { classNames: ["initials"] },
      document.createTextNode(firstName[0] + lastName[0] || "")
    ),
    createCardImage(profilePicture)
  );
  imageWrapper.style.backgroundColor = stringToColor(firstName || "");
  return imageWrapper;
}

function createContentWrapper({ firstName, lastName, contacts }) {
  return createElement(
    "div",
    {
      classNames: ["contentWrapper"],
    },
    createElement(
      "h3",
      { classNames: ["cardName"] },
      document.createTextNode(firstName || "")
    ),
    createElement(
      "p",
      { classNames: ["cardLastName"] },
      document.createTextNode(lastName || "")
    ),
    createElement(
      "div",
      {
        classNames: ["cardSocialLinks"],
      },
      ...createSocialLinks(contacts, socialOptions)
    )
  );
}

function createSocialLinks(contacts = [], social = {}) {
  const result = [];
  if (contacts.length === 0) return;
  for (const link of contacts) {
    const url = new URL(link);
    if (Object.keys(social).includes(url.host)) {
      result.push(createLink(url /*, social*/));
    }
  }
  return result;
}

function createLink(url /*, social*/) {
  const a = document.createElement("a");
  const icon = document.createElement("i");
  let reg = /(?:www\.|)([\w-]+).*/;
  let className = url.host.match(reg)[1];

  // for (const [key, value] of Object.entries(social)) {
  //   if (key === url.host) className = value;
  // }
  icon.classList.add("fab", `fa-${className}`);
  a.href = url;
  a.append(icon);
  return a;
}

/*
  EVENT HANDLERS
*/

function handleImageError({ target }) {
  target.remove();
}

function handleImageLoad({ target }) {
  target.hidden = false;
}

/*
  UTILS
*/

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
}

const regex = /^[0-9]+$/; //  /^\d+$/
const regex2 = /^[a-z][a-z0-9]{5,15}$/;

let test = "https://www.instagram.com/jasonstatham/?hl=ru";
let str = test.match(/https?:\/\/(?:www\.|)([\w-]+).*/);
