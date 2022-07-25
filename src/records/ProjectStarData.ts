import { Map, Record } from 'immutable'
import { ProjectStarParams, ProjectStarRecord } from './ProjectStar'

const defaultValue = {
  items: Map<string, ProjectStarRecord>(),
  isAllDisplayed: false,
  currentStar: {
    object: null as ProjectStarRecord | null,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
}

export class ProjectStarDataRecord extends Record(defaultValue) {
  public fillItems(items: ProjectStarParams[]) {
    return this.set(
      'items',
      items.reduce((acc, item) => {
        if (item.id) {
          return acc.set(item.id, ProjectStarRecord.create(item))
        }

        const record = ProjectStarRecord.create(item)
        return acc.set(record.id, record)
      }, Map<string, ProjectStarRecord>())
    )
  }

  public addItem(item: ProjectStarParams) {
    return this.update('items', (items) => {
      if (item.id) {
        return items.set(item.id, ProjectStarRecord.create(item))
      }

      const record = ProjectStarRecord.create(item)
      return items.set(record.id, record)
    })
  }

  public setItemIsRendered(id: string, isRendered: boolean) {
    return this.update('items', (items) =>
      items.update(id, (item) =>
        (item as ProjectStarRecord).setIsRendered(isRendered)
      )
    )
  }

  public setCurrentStar(
    id: string,
    position: { x: number; y: number; z: number }
  ) {
    return this.set('currentStar', {
      object: this.items.get(id) as ProjectStarRecord,
      position,
    })
  }

  public clearCurrentStar() {
    return this.set('currentStar', {
      object: null,
      position: { x: 0, y: 0, z: 0 },
    })
  }

  public setIsAllDisplayed(val: boolean) {
    return this.set('isAllDisplayed', val)
  }
}
