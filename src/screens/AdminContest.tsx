import React, { useEffect, useState } from 'react';
import { Accordion, Card, Form, Spinner, Table } from 'react-bootstrap';
import Select, { ValueType } from 'react-select';
import Alert from '../components/Alert';
import AdminContestTr from '../components/TableRow/AdminContestTr';
import { Api } from '../configs/Api';
import { Props } from '../configs/Props';
import { Utils } from '../configs/Utils';
import { Validations } from '../configs/Validations';
import { ArmedForce } from '../models/ArmedForce';
import { Contest } from '../models/Contest';
import { Patent } from '../models/Patent';
import { Scholarity } from '../models/Scholarity';
import { SelectModel } from '../models/SelectModel';
import styles from '../styles/admin.module.css';

const AdminContest = (props: Props) => {

    //#region fields

    const [btnTxt, setBtnTxt] = useState<string | object>();

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [year, setYear] = useState(0);
    const [yearError, setYearError] = useState('');

    const [armedForceSelect, setArmedForceSelect] = useState<SelectModel | null>();
    const [optionArmedForceSelect, setOptionArmedForceSelect] = useState<SelectModel[]>(new Array<SelectModel>());
    const [armedForceError, setArmedForceError] = useState('');
    
    const [patentSelect, setPatentSelect] = useState<SelectModel | null>();
    const [optionPatentSelect, setOptionPatentSelect] = useState<SelectModel[]>(new Array<SelectModel>());
    const [patentError, setPatentError] = useState('');
    
    const [scholaritySelect, setScholaritySelect] = useState<SelectModel | null>();
    const [optionScholaritySelect, setOptionScholaritySelect] = useState<SelectModel[]>(new Array<SelectModel>());
    const [scholarityError, setScholarityError] = useState('');

    const [salary, setSalary] = useState(0.00);
    const [questionsLength, setQuestionsLength] = useState(0);
    const [questionDescription, setQuestionDescription] = useState('');
    const [vacancies, setVacancies] = useState(0);
    const [vacanciesDescription, setVacanciesDescription] = useState('');
    const [testDate, setTestDate] = useState('');
    const [requirements, setRequirements] = useState('');
    const [registration, setRegistration] = useState('');
    const [areas, setAreas] = useState('');
    const [locations, setLocations] = useState('');
    const [duration, setDuration] = useState('');
    const [site, setSite] = useState('');

    //#endregion

    const [contests, setContests] = useState<Array<Contest>>(new Array<Contest>());
    const [isLoading, setIsLoading] = useState(true);

    const api = new Api();

    useEffect(() => {

        setBtnTxt('Adicionar');

        const getContest = async () => {

            await api.getContest()
                .then(res => {

                    var contest = res as Array<Contest>;

                    setContests(contest);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getContest();

        const getArmedForce = async () => {

            await api.getArmedForce()
                .then(res => {

                    var models = res as Array<ArmedForce>;

                    var opSelect = new Array<SelectModel>();

                    models.forEach(g => {
                        var cSel = new SelectModel();
                        cSel.label = g.name;
                        cSel.value = g.id;
                        opSelect.push(cSel);
                    });

                    setOptionArmedForceSelect(opSelect);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getArmedForce();

        const getPatent = async () => {

            await api.getPatent()
                .then(res => {

                    var models = res as Array<Patent>;

                    var opSelect = new Array<SelectModel>();

                    models.forEach(g => {
                        var cSel = new SelectModel();
                        cSel.label = g.name;
                        cSel.value = g.id;
                        opSelect.push(cSel);
                    });

                    setOptionPatentSelect(opSelect);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getPatent();

        const getScholarity = async () => {

            await api.getScholarity()
                .then(res => {

                    var models = res as Array<Scholarity>;

                    var opSelect = new Array<SelectModel>();

                    models.forEach(g => {
                        var cSel = new SelectModel();
                        cSel.label = g.name;
                        cSel.value = g.id;
                        opSelect.push(cSel);
                    });

                    setOptionScholaritySelect(opSelect);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getScholarity();
    }, []);

    const handleArmedForceSelect = (event: ValueType<SelectModel, false>) => setArmedForceSelect(event);
    const handlePatentSelect = (event: ValueType<SelectModel, false>) => setPatentSelect(event);
    const handleScholaritySelect = (event: ValueType<SelectModel, false>) => setScholaritySelect(event);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event?.preventDefault();
        setBtnTxt(<Spinner animation="grow" variant="light" size="sm" />);

        var nError = Validations.validateRequiredField(name, 'nome');
        var yError = Validations.validateRequiredField(year?.toString(), 'ano');
        var aFError = Validations.validateRequiredField(armedForceSelect?.value, 'força armada');
        var pError = Validations.validateRequiredField(patentSelect?.value, 'patente');
        var sError = Validations.validateRequiredField(scholaritySelect?.value, 'escolaridade');

        if(nError || yError || aFError || pError || sError)
        {
            setNameError(nError);
            setYearError(yError);
            setArmedForceError(aFError);
            setPatentError(pError);
            setScholarityError(sError);
            setBtnTxt('Adicionar');
        }
        else
        {
            setNameError('');
            setYearError('');
            setArmedForceError('');
            setPatentError('');
            setScholarityError('');

            const add = async () => {

                var model = new Contest();
                model.name = name;
                model.year = year;
                model.armedForceId = armedForceSelect?.value!;
                model.patentId = patentSelect?.value!;
                model.scholarityId = scholaritySelect?.value!;
                model.salary = salary;
                model.questionsLength = questionsLength;
                model.questionDescription = questionDescription;
                model.vacancies = vacancies;
                model.vacanciesDescription = vacanciesDescription;
                model.testDate = testDate;
                model.requirements = requirements;
                model.registration = registration;
                model.areas = areas;
                model.locations = locations;
                model.duration = duration;
                model.site = site;

                await api.insertContest(model)
                    .then(res => {

                        var newModel = res.data.model as Contest;
                        contests.push(newModel);
                        setContests(contests);

                        setBtnTxt('Adicionar');
                        Utils.alertLocalStorage(res.data.message, true);
                    })
                    .catch(error => {
                        console.log(error);
                        setBtnTxt('Adicionar');
                        Utils.alertLocalStorage(error.message, false);
                    })
            }
            add();
        }
    }

    return (
        <div className={`m-4`}>

            <Alert state={props.location.state} />
            
            <div className={`text-center`}>
                <h1 className={`${styles.h_title}`}>
                    Concursos
                </h1>
            </div>

            <div className={`mb-4`}>
                <Accordion>
                    <div className={`${styles.div_buttons}`}>
                        <Accordion.Toggle as={Card.Header} eventKey="1" className={`${styles.btn_menu}`}>
                            Adicionar
                        </Accordion.Toggle>
                    </div>
                    <div>
                        <Accordion.Collapse eventKey="1">
                            <Card>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label} ${styles.form_label_required}`}>
                                                Nome
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Digite o nome" 
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className={`${styles.form_control}`}
                                            />
                                            <Form.Text className="text-danger">
                                                {nameError}
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label} ${styles.form_label_required}`}>
                                                Ano
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Digite o ano" 
                                                value={year}
                                                onChange={(e) => setYear(+Utils.onlyNumberMask(e.target.value))}
                                                className={`${styles.form_control}`}
                                                min={1900}
                                                max={9999}
                                                minLength={4}
                                                maxLength={4}
                                            />
                                            <Form.Text className="text-danger">
                                                {yearError}
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label_required}`}>
                                                Força armada
                                            </Form.Label>
                                            <Select 
                                                value={armedForceSelect} 
                                                onChange={(e: ValueType<SelectModel, false>) => handleArmedForceSelect(e)}
                                                options={optionArmedForceSelect} 
                                                placeholder='Selecione a força armada' 
                                                menuPlacement='bottom'
                                                menuPosition='fixed'
                                            />
                                            <Form.Text className="text-danger">
                                                {armedForceError}
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label_required}`}>
                                                Patente
                                            </Form.Label>
                                            <Select 
                                                value={patentSelect} 
                                                onChange={(e: ValueType<SelectModel, false>) => handlePatentSelect(e)}
                                                options={optionPatentSelect} 
                                                placeholder='Selecione a patente' 
                                                menuPlacement='bottom'
                                                menuPosition='fixed'
                                            />
                                            <Form.Text className="text-danger">
                                                {patentError}
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label_required}`}>
                                                Escolaridade
                                            </Form.Label>
                                            <Select 
                                                value={scholaritySelect} 
                                                onChange={(e: ValueType<SelectModel, false>) => handleScholaritySelect(e)}
                                                options={optionScholaritySelect} 
                                                placeholder='Selecione a escolaridade' 
                                                menuPlacement='bottom'
                                                menuPosition='fixed'
                                            />
                                            <Form.Text className="text-danger">
                                                {scholarityError}
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label}`}>
                                                Salário
                                            </Form.Label>
                                            <Form.Control 
                                                type="number" 
                                                placeholder="Digite o ano" 
                                                value={salary}
                                                onChange={(e) => setSalary(+e.target.value)}
                                                className={`${styles.form_control}`}
                                                step={'any'}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label}`}>
                                                Questões
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Digite o número de questões" 
                                                value={questionsLength}
                                                onChange={(e) => setQuestionsLength(+Utils.onlyNumberMask(e.target.value))}
                                                className={`${styles.form_control}`}
                                                min={0}
                                                max={9999}
                                            />
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Digite a descrição das questões" 
                                                value={questionDescription}
                                                onChange={(e) => setQuestionDescription(e.target.value)}
                                                className={`${styles.form_control} mt-2`}
                                                as="textarea" 
                                                rows={3}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formName">
                                            <Form.Label className={`${styles.form_label}`}>
                                                Vagas
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Digite o número de vagas" 
                                                value={vacancies}
                                                onChange={(e) => setVacancies(+Utils.onlyNumberMask(e.target.value))}
                                                className={`${styles.form_control}`}
                                                min={0}
                                                max={9999999}
                                            />
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Digite a descrição das vagas" 
                                                value={vacanciesDescription}
                                                onChange={(e) => setVacanciesDescription(e.target.value)}
                                                className={`${styles.form_control} mt-2`}
                                                as="textarea" 
                                                rows={3}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label}`}>
                                                Data da prova
                                            </Form.Label>
                                            <Form.Control 
                                                type="date" 
                                                placeholder="Digite a data da prova" 
                                                value={testDate}
                                                onChange={(e) => setTestDate(e.target.value)}
                                                className={`${styles.form_control}`}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label}`}>
                                                Requisitos
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Digite os requisitos" 
                                                value={requirements}
                                                onChange={(e) => setRequirements(e.target.value)}
                                                className={`${styles.form_control}`}
                                                as="textarea" 
                                                rows={3}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label}`}>
                                                Inscrições
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Digite as inscrições" 
                                                value={registration}
                                                onChange={(e) => setRegistration(e.target.value)}
                                                className={`${styles.form_control}`}
                                                as="textarea" 
                                                rows={3}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label}`}>
                                                Áreas
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Digite as áreas de especialização" 
                                                value={areas}
                                                onChange={(e) => setAreas(e.target.value)}
                                                className={`${styles.form_control}`}
                                                as="textarea" 
                                                rows={3}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label}`}>
                                                Local
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Digite o local do internato" 
                                                value={locations}
                                                onChange={(e) => setLocations(e.target.value)}
                                                className={`${styles.form_control}`}
                                                as="textarea" 
                                                rows={3}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label}`}>
                                                Duração
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Digite a duração do internato" 
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                                className={`${styles.form_control}`}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className={`${styles.form_label}`}>
                                                Site
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Digite o site" 
                                                value={site}
                                                onChange={(e) => setSite(e.target.value)}
                                                className={`${styles.form_control}`}
                                            />
                                        </Form.Group>

                                        <div className={`text-center mt-3`}>
                                            <button type="submit" className={`${styles.btn_add}`}>
                                                {btnTxt}
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Accordion.Collapse>
                    </div>
                </Accordion>
            </div>
            <div>

                {isLoading ?
                    <div className={`text-center`}>
                        <Spinner animation="grow" size="sm" className={`color_primary`} />
                    </div>
                    :
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Ano</th>
                                <th>Força Armada</th>
                                <th>Patente</th>
                                <th>Escolaridade</th>
                                <th></th>
                            </tr>
                        </thead>
                        {contests.map((s, k) => (
                            <AdminContestTr 
                                contests={contests}
                                contest={s}
                                setContests={setContests}
                                optionArmedForceSelect={optionArmedForceSelect}
                                optionPatentSelect={optionPatentSelect}
                                optionScholaritySelect={optionScholaritySelect}
                                key={k} 
                            />
                        ))}
                    </Table>
                }
            </div>
        </div>
    )
}

export default AdminContest;