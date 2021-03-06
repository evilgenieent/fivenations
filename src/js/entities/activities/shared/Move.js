import Activity from '../Activity';
import Util from '../../../common/Util';
import { TILE_WIDTH, TILE_HEIGHT } from '../../../common/Const';

class Move extends Activity {
  /**
   * Constructor function to Move
   * @param  {[object]} entity Instance of an Entity class
   * @return {[object]}
   */
  constructor(entity) {
    super();
    this.entity = entity;
    this.coords = {};

    // helper variable to avoid calculating the distance between
    // the main and target entity more than once per tick
    this._distance = 0;
  }

  /**
   * Executes the activity against an entity
   * @param {boolean} killWhenCoordsEqual - Indicator to kill the activity
   * if the entity is already occupying the same tile as the target
   */
  activate(killWhenCoordsEqual = true) {
    super.activate();

    if (!this.entity.canMove()) {
      this.kill();
      return;
    }

    if (
      killWhenCoordsEqual &&
      Util.areCoordsEqual(this.entity.getTileObj(), this.getTile())
    ) {
      this.kill();
      return;
    }

    this.entity.getMotionManager().moveTo(this);
  }

  /**
   * Calculates the distance between the given and target entity
   */
  calculateDistance() {
    this._distance = Util.distanceBetween(this.entity, this.target);
  }

  /**
   * Saving the target to which the entity will be moved
   * @return {[void]}
   */
  setCoords(coords) {
    if (!coords) {
      throw 'The given paramater is invalid to set up the coordinates!';
    }
    this.coords = coords;
  }

  /**
   * Returns the coordinates to which the entity moves
   * @return {object} object literal that contains the coordinates
   */
  getCoords() {
    return this.coords;
  }

  /**
   * Returns the tile of the destination
   * @return {object} { x, y }
   */
  getTile() {
    return {
      x: Math.floor(this.coords.x / TILE_WIDTH),
      y: Math.floor(this.coords.y / TILE_HEIGHT),
    };
  }
}

export default Move;
