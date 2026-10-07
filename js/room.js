const rooms = {
  standard: {
    name: "Standard Double",
    summary: "A quiet room for two on the courtyard side, with a queen bed and a rain shower.",
    price: "€145 / night",
    contact: "contact.html?room=standard",
    facts: [
      ["Size", "22 m²"],
      ["Sleeps", "Two"],
      ["Bed", "Queen"],
      ["Outlook", "Courtyard pines, second floor"],
      ["Bathroom", "Walk-in rain shower"],
    ],
    paragraphs: [
      "The Standard Double is the quietest room in the house. It faces the courtyard pines rather than the road, so the morning stays soft.",
      "The queen bed is dressed in oatmeal linen. A desk and a reading lamp sit by the window, and a kettle is there for tea after a late arrival. Blackout curtains cover the glass.",
      "The bathroom has a walk-in rain shower, a slim wood vanity, and towels in the same tone as the bed. It suits two people, including a single night between trains.",
    ],
    images: [
      ["images/standard-double.jpg", "Standard Double with a linen-dressed queen bed and pines outside the window"],
      ["images/standard-double-angle.jpg", "The same Standard Double seen from the window, with the bed and desk"],
      ["images/standard-double-view.jpg", "Pine trees in the courtyard, seen from the Standard Double window"],
      ["images/standard-double-desk.jpg", "Oak desk, reading lamp, and kettle in the Standard Double"],
    ],
  },
  "lake-view": {
    name: "Lake View Suite",
    summary: "A top-floor suite for two, with a king bed, a sitting corner, and a wide window onto the lake.",
    price: "€240 / night",
    contact: "contact.html?room=lake-view",
    facts: [
      ["Size", "36 m²"],
      ["Sleeps", "Two"],
      ["Bed", "King, plus a sofa"],
      ["Outlook", "Lake Saimaa, top floor"],
      ["Bathroom", "Bathtub and a separate shower"],
    ],
    paragraphs: [
      "The suite sits on the top floor. A wide window takes in the jetty and the open water, and the morning light comes straight off the lake.",
      "Besides the king bed there is a sitting corner with one armchair, for reading or for coffee before breakfast. A kettle and two cups live on the side table.",
      "The bathroom has a freestanding bathtub near the glass and a separate shower. Choose this room when the view matters more than anything else.",
    ],
    images: [
      ["images/lake-view-suite.jpg", "Lake View Suite with a wide window onto the lake"],
      ["images/lake-view-angle.jpg", "Sitting corner of the Lake View Suite, looking toward the lake"],
      ["images/lake-view-window.jpg", "The lake and jetty seen from the suite window"],
      ["images/lake-view-seat.jpg", "Linen armchair by the window in the Lake View Suite"],
    ],
  },
  family: {
    name: "Family Room",
    summary: "A larger room for up to four, with a queen bed, a sofa bed, and a table by the birch woods.",
    price: "€195 / night",
    contact: "contact.html?room=family",
    facts: [
      ["Size", "32 m²"],
      ["Sleeps", "Up to four"],
      ["Beds", "Queen bed and a sofa bed"],
      ["Outlook", "Birch woods"],
      ["Bathroom", "Walk-in shower and a double vanity"],
    ],
    paragraphs: [
      "The Family Room has space to spread out. A queen bed and a sofa bed sleep four, and a cot can be added for a smaller child. The sofa bed is made up when you ask at the desk.",
      "A small wooden table seats four, so a slow morning can start in the room. The window looks into birch woods rather than onto the lake.",
      "The bathroom is practical: a roomy shower and a double vanity, with towels for the whole party.",
    ],
    images: [
      ["images/family-room.jpg", "Family Room with a queen bed, sofa bed, and a view into birch woods"],
      ["images/family-room-angle.jpg", "Table and sofa bed in the Family Room, seen from the other side"],
      ["images/family-room-view.jpg", "Birch woods seen from the Family Room window"],
      ["images/family-room-table.jpg", "Wooden table for four in the Family Room"],
    ],
  },
};

const root = document.querySelector("#room-root");
const room = rooms[new URLSearchParams(window.location.search).get("room")];

function textElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  element.textContent = text;
  return element;
}

if (!room) {
  root.replaceChildren();
  const section = document.createElement("section");
  section.className = "page-intro";
  const wrap = document.createElement("div");
  wrap.className = "wrap";
  wrap.append(
    textElement("h1", "", "Room not found"),
    textElement("p", "lede", "Choose a room from the list and we will show the details here."),
  );
  const back = document.createElement("a");
  back.className = "btn btn-pine";
  back.href = "rooms.html";
  back.textContent = "Back to rooms";
  wrap.append(back);
  section.append(wrap);
  root.append(section);
} else {
  document.title = `${room.name} — Hotel Aurora`;
  root.replaceChildren();

  const intro = document.createElement("section");
  intro.className = "page-intro";
  const introWrap = document.createElement("div");
  introWrap.className = "wrap";
  const backLink = document.createElement("a");
  backLink.href = "rooms.html";
  backLink.textContent = "All rooms";
  introWrap.append(
    backLink,
    textElement("h1", "", room.name),
    textElement("p", "lede", room.summary),
  );
  intro.append(introWrap);

  const section = document.createElement("section");
  section.className = "section section-follow";
  const layout = document.createElement("div");
  layout.className = "wrap detail-layout";

  const gallery = document.createElement("div");
  gallery.className = "detail-gallery";
  room.images.forEach(([src, alt]) => {
    const image = document.createElement("img");
    image.className = "zoomable";
    image.src = src;
    image.alt = alt;
    gallery.append(image);
  });

  const copy = document.createElement("div");
  room.paragraphs.forEach((paragraph) => {
    copy.append(textElement("p", "", paragraph));
  });

  const facts = document.createElement("dl");
  facts.className = "detail-list";
  room.facts.forEach(([label, value]) => {
    const item = document.createElement("div");
    item.append(textElement("dt", "", label), textElement("dd", "", value));
    facts.append(item);
  });

  const price = textElement("p", "price", room.price);
  const ask = document.createElement("a");
  ask.className = "btn btn-pine";
  ask.href = room.contact;
  ask.textContent = "Ask about this room";
  copy.append(facts, price, ask);

  layout.append(gallery, copy);
  section.append(layout);
  root.append(intro, section);
}
