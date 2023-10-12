// Un-randomize the Math.random
//
class PseudoRandom {

    static randomValues = [0.14102989272214472, 0.0351817375048995,
            0.10094573209062219, 0.35990892769768834, 0.7690574480220675,
            0.16634021210484207, 0.3944594960194081, 0.7656398438848555,
            0.27706647920422256, 0.5681763959582895, 0.513730650767684,
            0.26344996923580766, 0.09001278411597013, 0.2977627406362444,
            0.6982127586379647, 0.9593012358527631, 0.8456065070349723,
            0.26248381356708705, 0.12872424302622676, 0.25530692492611706,
            0.9969052199739963, 0.09259856841526926, 0.9022860133554786,
            0.3393681487068534, 0.41671016393229365, 0.10582929337397218,
            0.1322793234139681, 0.595869708340615, 0.050670077092945576,
            0.8613549116998911, 0.17356411134824157, 0.16447093593887985,
            0.44514468451961875, 0.15736589767038822, 0.8677479331381619,
            0.30932203005068004, 0.6120233973488212, 0.001859797164797783,
            0.7689258102327585, 0.7421043077483773, 0.7548440918326378,
            0.9667320610024035, 0.13654314493760467, 0.6277681242208928,
            0.002858637133613229, 0.6877673089038581, 0.44036358245648444,
            0.3101970909629017, 0.013212101766839623, 0.7115063068922609,
            0.2931885647121817, 0.5031651991885155, 0.8921459852717817,
            0.547999506117776, 0.010382920736446977, 0.9862914837431163,
            0.9629317701328546, 0.07685352209955454, 0.2859949553385377,
            0.5578324059024453, 0.7765828191768378, 0.1696563793811947,
            0.34366130153648555, 0.11959927808493376, 0.8898638435639441,
            0.8963573810178787, 0.332408863119781, 0.27137733018025756,
            0.3066735703032464, 0.2789501305669546, 0.4567076754756272,
            0.09539463231340051, 0.9158625246491283, 0.2145260546822101,
            0.8913846455980092, 0.22340057184919715, 0.09033847553655505,
            0.49042539740912616, 0.4070818084292114, 0.5827512110117823,
            0.1993762720376253, 0.9264022477436811, 0.3290765874553472,
            0.07792594563215971, 0.7663758248090744, 0.4329648329876363,
            0.10257583996281028, 0.8170149670913815, 0.41387700103223324,
            0.7504217880778015, 0.08603733032941818, 0.17256441875360906,
            0.4064991301856935, 0.829071992309764, 0.6997416105587035,
            0.2686419754754752, 0.36025605257600546, 0.6014082923065871,
            0.9787689209915698, 0.016065671807155013];
    public randomCursor = 0;

    pseudorandom() {
        return PseudoRandom.randomValues[this.randomCursor++ % PseudoRandom.randomValues.length];

    }
}

export function generateOHLC(size: number){

    const p = new PseudoRandom();
    const data: Array<Array<number>> = [],
        firstPoint = Date.UTC(2022, 0),
        dayInMilis  = 8.64e7,
        gap = Math.floor(size * 0.1);


    for (let i = 0;i < size + gap; i++) {
        if (i > gap && i < gap * 2) {
            continue;
        }
        data.push([
            firstPoint + i * dayInMilis,
            Math.floor(100* p.pseudorandom()),
            Math.floor(100* p.pseudorandom()),
            Math.floor(100* p.pseudorandom()),
            Math.floor(100* p.pseudorandom()),
        ]);
    }
    return data;
}
export function generateCSV(rows:number, columns: number){
    const pseudorandom = new PseudoRandom();
    let csv = 'id';
    for (let column = 0; column < columns; column++) {
        csv += `,col${column}`;
    }
    csv += '\n';

    for (let row = 0; row < rows; row++) {
        csv += `${row}`;
        for (let j = 0; j < columns; j++) {
            csv += `,${pseudorandom.pseudorandom()}`;
        }
        csv += '\n';
    }

    return csv;
}

export function generateColumnData(rows: number, columns: number){
    const data = [];
    const pseudorandom = new PseudoRandom();
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push(pseudorandom.pseudorandom());
        }
        data.push(row);
    }
    return data;
}
