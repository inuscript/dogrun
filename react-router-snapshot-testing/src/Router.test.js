import React from 'react';
import { SomeRouter, DynamicRouter } from "./App"
import { StaticRouter, MemoryRouter } from "react-router-dom"
import { create } from 'react-test-renderer'
import { shallow, mount, render } from "enzyme"
const mockContext = {}

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

describe("shallow", () => {

  it('/shallow shallow', () => {
    const wrapper = render(
      <StaticRouter context={mockContext} location="/shallow"><SomeRouter /></StaticRouter>
    )
    expect(wrapper.find(".shallowTarget").length).toBe(1)
  })
  it('memory routing', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/shallow"]}><SomeRouter /></MemoryRouter>
    )
    expect(wrapper.find(".shallowTarget").length).toBe(1)
    // console.log(wrapper.html()) // これは取れてる
  })

})


describe.only("dynamic snapshot", () => {
  it('/user/bob', () => {
    const tree = create(
      <MemoryRouter initialEntries={["/user/bob"]} ><DynamicRouter /></MemoryRouter>
    ).toJSON()
    expect(tree).toMatchSnapshot()  
  })
  it('/userbob', () => {
    const tree = create(
      <MemoryRouter initialEntries={["/unknown"]} ><DynamicRouter /></MemoryRouter>
    ).toJSON()
    expect(tree).toMatchSnapshot()  
  })
})