import mafia from '../image/mafia.PNG'
import citizen from '../image/citizen.PNG'
import police from '../image/police.PNG'
import doctor from '../image/doctor.PNG'
import psychopath from '../image/psychopath.png'
import reporter from '../image/reporter.PNG'

const Job = [
    {
        job: "MAFIA",
        image: mafia,
        jobName: "마피아",
        jobDescription : '밤마다 플레이어 한 명을 죽일 수 있다.'
    },
    {
        job: "POLICE",
        image: police,
        jobName: "경찰",
        jobDescription : '밤마다 플레이어 한 명을 조사하여 그 플레이어의 직업을 알아낼 수 있다.'
    },
    {
        job: "CITIZEN",
        image: citizen,
        jobName: "시민",
        jobDescription : '마피아팀을 모두 제거할 경우, 승리한다.'
    },
    {
        job: "DOCTOR",
        image: doctor,
        jobName: "의사",
        jobDescription : '밤마다 한 사람을 지목하여 대상이 마피아에게 공격받을 경우, 대상을 치료한다'
    },
    {
        job: "PSYCHOPATH",
        image: psychopath,
        jobName: "정신병자",
        jobDescription : '헤에엫 선생님 저거 뭐에요?'
    },
    {
        job: "REPORTER",
        image: reporter,
        jobName: "기자",
        jobDescription : '밤에 한 명을 선택하여 취재해 다음 날 그 사람의 직업을 모두에게 공개한다.(1회용)'
    }
];
export default Job;

