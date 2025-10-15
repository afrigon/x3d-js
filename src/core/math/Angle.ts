type AngleType = "degrees" | "radians"

export class Angle {
    private type: AngleType
    private _value: number

    private constructor(type: AngleType, value: number) {
        this.type = type
        this._value = value
    }

    toDegrees(): number {
        switch (this.type) {
            case "degrees":
                return this._value
            case "radians":
                return this._value * 180 / Math.PI
        }
    }

    toRadians(): number {
        switch (this.type) {
            case "degrees":
                return this._value * Math.PI / 180
            case "radians":
                return this._value
        }
    }

    static degrees(value: number) {
        return new Angle("degrees", value)
    }

    static radians(value: number) {
        return new Angle("radians", value)
    }
}