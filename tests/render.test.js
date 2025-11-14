import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { JSDOM } from "jsdom";
import fs from "node:fs";
import path from "node:path";

// we'll simulate index.html and then import main.js which renders into the DOM
const html = fs.readFileSync(path.resolve("index.html"), "utf8");

describe("Landing page renders", () => {
  let dom;
  let document;
  let window;

  beforeEach(async () => {
    // create a JSDOM environment
    dom = new JSDOM(html, {
      url: "http://localhost",
      pretendToBeVisual: true,
      resources: "usable"
    });
    
    document = dom.window.document;
    window = dom.window;
    
    // Set up global document and window for the modules
    global.document = document;
    global.window = window;
    global.HTMLElement = window.HTMLElement;
    global.Element = window.Element;
    global.Node = window.Node;
    
    // Mock console to avoid noise in tests
    global.console = {
      ...console,
      warn: vi.fn(),
      error: vi.fn(),
      log: vi.fn()
    };
    
    // import main AFTER DOM is set
    await import("../src/main.js");
  });

  it("renders hero content", () => {
    const hero = document.querySelector("#hero");
    expect(hero).toBeTruthy();
    expect(hero.textContent).toMatch(/Smith & Associates/i);
    expect(hero.textContent).toMatch(/Trusted Legal Representation/i);
  });

  it("renders practice areas", () => {
    const cards = document.querySelectorAll(".card");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("has a Netlify form with hidden input", () => {
    const form = document.querySelector('form[name="contact"]');
    expect(form).toBeTruthy();
    const hidden = form.querySelector('input[name="form-name"][value="contact"]');
    expect(hidden).toBeTruthy();
  });

  it("navbar links point to sections", () => {
    const links = Array.from(document.querySelectorAll("#navbar a")).map(a => a.getAttribute("href"));
    expect(links).toContain("#hero");
    expect(links).toContain("#about");
    expect(links).toContain("#practice");
    expect(links).toContain("#team");
    expect(links).toContain("#contact");
  });

  it("renders team section with team members", () => {
    const teamSection = document.querySelector("#team");
    expect(teamSection).toBeTruthy();
    const teamCards = document.querySelectorAll(".team-card");
    expect(teamCards.length).toBeGreaterThan(0);
    expect(teamSection.textContent).toMatch(/Meet Our Team/i);
  });

  afterEach(() => {
    // Clean up
    delete global.document;
    delete global.window;
    delete global.HTMLElement;
    delete global.Element;
    delete global.Node;
  });
});
