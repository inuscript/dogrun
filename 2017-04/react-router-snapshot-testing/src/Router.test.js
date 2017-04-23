import React from 'react';
import { MemoryRouter } from "react-router-dom"
import { create } from 'react-test-renderer'

import { SomeRouter, DynamicRouter } from "./App"

describe("snapshot", () => {
  it('default routing', () => {
    const tree = create(
      <MemoryRouter initialEntries={["/"]} ><SomeRouter /></MemoryRouter>
    ).toJSON()
    expect(tree).toMatchSnapshot()  
  })
  
  it('/foo routing', () => {
    const tree = create(
      <MemoryRouter initialEntries={["/foo"]}><SomeRouter /></MemoryRouter>
    ).toJSON()
    expect(tree).toMatchSnapshot()  
  })

  it('/baz routing', () => {
    const tree = create(
      <MemoryRouter initialEntries={["/baz"]}><SomeRouter /></MemoryRouter>
    ).toJSON()
    expect(tree).toMatchSnapshot()  
  })

  it('memory routing', () => {
    const tree = create(
      <div>
        <MemoryRouter initialEntries={["/baz"]}><SomeRouter /></MemoryRouter>
        <MemoryRouter initialEntries={["/foo"]}><SomeRouter /></MemoryRouter>
      </div>
    ).toJSON()
    expect(tree).toMatchSnapshot()  
  })

})

  // shallowだとうまくfindが出来ない。renderかmountで可能
  import { mount, render } from "enzyme"

describe("shallow", () => {
  // const mockContext = {}
  // 
  // it('/shallow shallow', () => {
  //   const wrapper = render(
  //     <StaticRouter context={mockContext} location="/shallow"><SomeRouter /></StaticRouter>
  //   )
  //   expect(wrapper.find(".shallowTarget").length).toBe(1)
  // })
  it('memory routing', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/mount"]}><SomeRouter /></MemoryRouter>
    )
    expect(wrapper.find(".testTarget").length).toBe(1)
  })

})


describe("dynamic snapshot", () => {
  it('/user/bob', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/user/bob"]} ><DynamicRouter /></MemoryRouter>
    )
    expect(wrapper.text()).toBe("Hello bob")
  })
  it('/user/sam', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/user/sam"]} ><DynamicRouter /></MemoryRouter>
    )
    expect(wrapper.text()).toBe("Hello sam")
  })
  it('/unknown', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/unknown"]} ><DynamicRouter /></MemoryRouter>
    )
    expect(wrapper.text()).toBe("Oops")
  })
})