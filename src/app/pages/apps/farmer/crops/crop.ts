export class Crop {
  constructor(
    public id: number,
    public name: string,
    public temperature: number,
    public humidity: number,
    public tankMaxVolume: number,
    public tankCurrentVolume: number,
    public temperatureMaxThreshold: number,
    public humidityMinThreshold: number,
    public isIrrigating: boolean
  ){}

  static fromDto(dto: any): Crop {
    const id = dto.id ?? 0;
    const name = dto.name ?? '';
    const temperature = dto.temperature ?? 0;
    const humidity = dto.humidity ?? 0;
    const tankMaxVolume = dto.tankMaxVolume ?? 0;
    const tankCurrentVolume = dto.tankCurrentVolume ?? 0;
    const temperatureMaxThreshold = dto.temperatureMaxThreshold ?? 0;
    const humidityMinThreshold = dto.humidityMinThreshold ?? 0;
    const isIrrigating = dto.isIrrigating ?? false;
    return new Crop(id, name, temperature, humidity, tankMaxVolume, tankCurrentVolume, temperatureMaxThreshold, humidityMinThreshold, isIrrigating);
  }
}
