import { SquareMetersPipe } from "./square-meters-pipe";

describe('SquareMetersPipe', ()=>{

  it('create an instance of SquareMetersPipe', () => {
    const pipe = new SquareMetersPipe();
    expect(pipe).toBeTruthy();
  });

  it('80 should return "80 m2"', () => {
    const pipe = new SquareMetersPipe();
    const result = pipe.transform(80);

    expect(result).toBe('80 m2');
  });

  it('"80" should return "80 m2"', () => {  
    const pipe = new SquareMetersPipe();
    const result = pipe.transform('80');

    expect(result).toBe('80 m2');
  });

});