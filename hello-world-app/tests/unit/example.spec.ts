import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import { increment } from "@/shared/helper";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe("increment", () => {
  test("increments the current number by 1", () => {
    expect(increment(0, 10)).toBe(1);
  });

  test("does not increment the current number over the max", () => {
    expect(increment(10, 10)).toBe(10);
  });

  test("has a default max of 10", () => {
    expect(increment(10)).toBe(10);
  });
});
