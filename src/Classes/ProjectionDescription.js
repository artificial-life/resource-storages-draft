'use strict'

class ProjectionDescription {
    constructor(Volume, projection, formula) {
        this.volume = Volume;
        this.projection = projection;
        this.formula = formula;
    }
    getVolume() {
        return this.volume;
    }
    getProjection() {
        var name = this.getParamNames()[0].name;
        return {
            projection: this.projection,
            name: name
        };
    }
    getFormula() {
        return this.formula;
    }
    getParamNames() {
        return this.volume.getPrimitiveVolumeType().getParamsDescription();
    }

}

module.exports = ProjectionDescription;