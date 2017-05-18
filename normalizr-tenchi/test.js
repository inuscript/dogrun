const { groupBy, mapValues } = require("lodash")
const { normalize, schema, denormalize } = require("normalizr")
const areasData = [
  { id: 1, name: "tohoku" },
  { id: 2, name: "kanto" },
]
const prefsData = [
  { id: 1, name: "aomori", areaId: 1 },
  { id: 2, name: "akita", areaId: 1 },
  { id: 3, name: "tokyo", areaId: 2 }
]

const createMockState = () => {
  const areas = [new schema.Entity("areas")]
  const prefs = [new schema.Entity("prefs")]
  return Object.assign({},
    normalize(areasData, areas).entities,
    normalize(prefsData, prefs).entities
  )
}

describe("", () => {
  // it("1", () => {
  //   const state = createMockState()
  //   const entity = {
  //     areas: [new schema.Entity("areas", {
  //       prefs: new schema.Entity("prefs") 
  //     })],
  //     prefs: [new schema.Entity("prefs", {
  //       areaId: new schema.Entity("areas")
  //     })]
  //   }
  //   const de = denormalize({ areas: [1] }, entity, state)
  
  //   console.log(state)
  //   console.log(de)
  // })
  it("1", () => {
    const state = createMockState()
    const areaGrouped = groupBy(state.prefs, "areaId")
    const a = mapValues(state.areas, area => {
      return Object.assign({}, 
        area,
        { prefs: areaGrouped[area.id] }
      )
    })
    console.log(JSON.stringify(a, null, 2))
  })
  // it("2", () => {
  //   const prefs = [new schema.Entity("prefs")]
  //   const areas = [new schema.Entity("areas", {
  //     prefs
  //   })]
  //   const state = normalize({ areas: areasData, prefs: prefsData}, {
  //     areas, prefs
  //   })

  //   console.log(state.entities)
  // })
})