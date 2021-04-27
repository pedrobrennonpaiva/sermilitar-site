import React, { useEffect, useState } from "react";
import { Card, Form, Spinner } from "react-bootstrap";
import Select, { ValueType } from 'react-select';
import { Api } from "../../configs/Api";
import { AdminContestParams } from "../../configs/Params";
import { Utils } from "../../configs/Utils";
import { Validations } from "../../configs/Validations";
import { Contest } from "../../models/Contest";
import { SelectModel } from "../../models/SelectModel";
import styles from '../../styles/admin.module.css';

const AdminContestTr = ({ 
        contest, contests, setContests, optionArmedForceSelect, optionPatentSelect, optionScholaritySelect 
    } : AdminContestParams) => {

    //#region fields
    
    const [btnTxt, setBtnTxt] = useState<string | object>();
    const [btnDisable, setBtnDisable] = useState(false);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [year, setYear] = useState(0);
    const [yearError, setYearError] = useState('');

    const [armedForceSelect, setArmedForceSelect] = useState<SelectModel | null>();
    const [armedForceError, setArmedForceError] = useState('');
    
    const [patentSelect, setPatentSelect] = useState<SelectModel | null>();
    const [patentError, setPatentError] = useState('');
    
    const [scholaritySelect, setScholaritySelect] = useState<SelectModel | null>();
    const [scholarityError, setScholarityError] = useState('');

    const [salary, setSalary] = useState<number>();
    const [questionsLength, setQuestionsLength] = useState<number>();
    const [questionDescription, setQuestionDescription] = useState<string>();
    const [vacancies, setVacancies] = useState<number>();
    const [vacanciesDescription, setVacanciesDescription] = useState<string>();
    const [testDate, setTestDate] = useState<string | Date>();
    const [requirements, setRequirements] = useState<string>();
    const [registration, setRegistration] = useState<string>();
    const [areas, setAreas] = useState<string>();
    const [locations, setLocations] = useState<string>();
    const [duration, setDuration] = useState<string>();
    const [site, setSite] = useState<string>();

    //#endregion

    const [displayTr, setDisplayTr] = useState('none');

    const [btnTxtDelete, setBtnTxtDelete] = useState<string | object>();
    const [btnDeleteDisable, setBtnDeleteDisable] = useState(false);

    const api = new Api();
    
    useEffect(() => {

        setBtnTxt('Atualizar');
        setBtnTxtDelete('Excluir');
        
        setName(contest?.name!);
        setYear(contest?.year!);
        setArmedForceSelect(optionArmedForceSelect.find(x => x.value === contest?.armedForceId));
        setPatentSelect(optionPatentSelect.find(x => x.value === contest?.patentId));
        setScholaritySelect(optionScholaritySelect.find(x => x.value === contest?.scholarityId));
        setSalary(contest?.salary);
        setQuestionsLength(contest?.questionsLength);
        setQuestionDescription(contest?.questionDescription);
        setVacancies(contest?.vacancies);
        setVacanciesDescription(contest?.vacanciesDescription);
        setTestDate(contest?.testDate);
        setRequirements(contest?.requirements);
        setRegistration(contest?.registration);
        setAreas(contest?.areas);
        setLocations(contest?.locations);
        setDuration(contest?.duration);
        setSite(contest?.site);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleArmedForceSelect = (event: ValueType<SelectModel, false>) => setArmedForceSelect(event);
    const handlePatentSelect = (event: ValueType<SelectModel, false>) => setPatentSelect(event);
    const handleScholaritySelect = (event: ValueType<SelectModel, false>) => setScholaritySelect(event);

    const handleOpenUpdate = () => {
        setDisplayTr(displayTr === 'none' ? 'table-row' : 'none');
    }

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {

        event?.preventDefault();
        setBtnDisable(true);
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
            setBtnTxt('Atualizar');
        }
        else
        {
            const update = async () => {

                var model = new Contest();
                model.id = contest?.id!;
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
                model.areas = areas;
                model.locations = locations;
                model.duration = duration;
                model.site = site;

                await api.updateContest(model)
                    .then(res => {

                        var newModel = res.data.model as Contest;
                        
                        const newSch = contests?.map((s) => {

                            if(s.id === newModel.id)
                            {
                                const update = {
                                    ...s,
                                    name: newModel.name
                                }
                                return update;
                            }
                            return s;
                        });

                        setContests!(newSch!);
                        setBtnDisable(false);
                        setBtnTxt('Atualizar');
                        alert(res.data.message);
                    })
                    .catch(error => {
                        console.log(error);
                        setBtnDisable(false);
                        setBtnTxt('Atualizar');
                        alert(error.message);
                    })
            }
            update();
        }
    }

    const handleDelete = async () => {

        if(window.confirm(`Tem certeza que deseja excluir o concurso?`))
        {
            setBtnDeleteDisable(true);
            setBtnTxtDelete(<Spinner animation="grow" variant="light" size="sm" />);

            await api.deleteContest(contest?.id!)
                .then(res => {

                    var newSch = contests?.filter((s) => s !== contest);
                    setContests!(newSch!);
                    alert(res.data.message);
                })
                .catch(err => {
                    console.log(err);
                    setBtnDeleteDisable(false);
                    setBtnTxtDelete('Excluir');
                    alert(err.message);
                });
        }
    }

    return (
        <tbody>
            <tr>
                <td>
                    {contest?.name}
                </td>
                <td>
                    {contest?.year}
                </td>
                <td>
                    {contest?.armedForce?.name}
                </td>
                <td>
                    {contest?.patent?.name}
                </td>
                <td>
                    {contest?.scholarity?.name}
                </td>
                <td className={`${styles.td_buttons}`}>
                    <button 
                        className={`${styles.btn_table_primary}`}
                        onClick={handleOpenUpdate}
                    >
                        {btnTxt}
                    </button>
                    <button 
                        className={`${styles.btn_table_secondary} ml-2`}
                        onClick={handleDelete}
                        disabled={btnDeleteDisable}
                    >
                        {btnTxtDelete}
                    </button>
                </td>
            </tr>
            <tr style={{ display: displayTr }}>
                <td colSpan={100}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleUpdate}>
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
                                        value={Utils.formatDate(testDate?.toString())}
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
                                    <button type="submit" className={`${styles.btn_add}`} disabled={btnDisable}>
                                        {btnTxt}
                                    </button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </td>
            </tr>
        </tbody>
    )
}

export default AdminContestTr;
