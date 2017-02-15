import React from 'react';
import Router from "./Router"
import { StaticRouter, MemoryRouter } from "react-router-dom"
import { create } from 'react-test-renderer'
import { shallow, mount, render } from "enzyme"
const mockContext = {}

describe("snapshot", () => {
  it('default routing', () => {
    const tree = create(
      <StaticRouter context={mockContext}><Router /></StaticRouter>
    ).toJSON()
    expect(tree).toMatchSnapshot()  
  })
  
  it('/foo routing', () => {
    const tree = create(
      <StaticRouter context={mockContext} location="/foo"><Router /></StaticRouter>
    ).toJSON()
    expect(tree).toMatchSnapshot()  
  })

  it('/baz routing', () => {
    const tree = create(
      <StaticRouter context={mockContext} location="/baz"><Router /></StaticRouter>
    ).toJSON()
    expect(tree).toMatchSnapshot()  
  })

  it('memory routing', () => {
    const tree = create(
      <div>
        <MemoryRouter initialEntries={["/baz"]}><Router /></MemoryRouter>
        <MemoryRouter initialEntries={["/foo"]}><Router /></MemoryRouter>
      </div>
    ).toJSON()
    expect(tree).toMatchSnapshot()  
  })

})

describe("shallow", () => {

  it('/shallow shallow', () => {
    // shallowだとうまくfindが出来ない。renderかmountで可能
    const wrapper = render(
      <StaticRouter context={mockContext} location="/shallow"><Router /></StaticRouter>
    )
    expect(wrapper.find(".shallowTarget").length).toBe(1)
  })
  it('memory routing', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/shallow"]}><Router /></MemoryRouter>
    )
    expect(wrapper.find(".shallowTarget").length).toBe(1)
  })

})