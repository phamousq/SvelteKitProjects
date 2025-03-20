import { ac as ensure_array_like, a7 as escape_html, a4 as attr, T as pop, Q as push, af as once } from "../../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  class Counter {
    count = Math.floor(Math.random() * 100);
    increment() {
      this.count++;
    }
    decrement() {
      this.count--;
    }
    zero() {
      this.count = 0;
    }
  }
  class Counters {
    lstCounters = [new Counter()];
    #lenCounters = once(() => this.lstCounters.length);
    get lenCounters() {
      return this.#lenCounters();
    }
    #sumCounters = once(() => this.lstCounters.reduce((a, b) => a + b.count, 0));
    get sumCounters() {
      return this.#sumCounters();
    }
    #averageCounters = once(() => this.lstCounters.reduce((a, b) => a + b.count, 0) / this.lstCounters.length);
    get averageCounters() {
      return this.#averageCounters();
    }
  }
  const counters = new Counters();
  const each_array = ensure_array_like(counters.lstCounters);
  $$payload.out += `<table border="2"><thead class="thead-dark"></thead><tbody id="tableBody"><tr><td># counters</td><td>${escape_html(counters.lenCounters)}</td></tr><tr><td>sum of counters</td><td>${escape_html(counters.sumCounters)}</td></tr><tr><td>average of counters</td><td>${escape_html(counters.averageCounters)}</td></tr></tbody></table> <p><button>Push</button> <button>Unshift</button> <button>Shift</button> <button>Pop</button></p> <!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let item = each_array[index];
    $$payload.out += `<p><input type="number"${attr("value", item.count)}${attr("disabled", true, true)}> <button>Increment</button> <button>Decrement</button> <button>Zero</button> <button>Remove</button></p>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
