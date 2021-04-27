import React, { useEffect, useState } from "react";
import { Card, Form, Spinner } from "react-bootstrap";
import Select, { ValueType } from 'react-select';
import { faCheckCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Api } from '../configs/Api';
import { AdminQuestionAddParams } from "../configs/Params";
import { Validations } from "../configs/Validations";
import { Alternative } from "../models/Alternative";
import { QuestionText } from "../models/QuestionText";
import { SelectModel } from '../models/SelectModel';
import { SubjectMatter } from "../models/SubjectMatter";
import styles from '../styles/admin.module.css';

const AdminQuestionAddForm = ({ 
    question, 
    questions, 
    setQuestions,
    subjects,
    contests,
    questionTexts 
} : AdminQuestionAddParams) => {

    //#region fields
    
    const [contestSelect, setContestSelect] = useState<SelectModel | null>();
    const [optionContestSelect, setOptionContestSelect] = useState<SelectModel[]>(new Array<SelectModel>());
    
    const [subjectSelect, setSubjectSelect] = useState<SelectModel | null>();
    const [optionSubjectSelect, setOptionSubjectSelect] = useState<SelectModel[]>(new Array<SelectModel>());
    
    const [subjectMatterSelect, setSubjectMatterSelect] = useState<SelectModel | null>();
    const [optionSubjectMatterSelect, setOptionSubjectMatterSelect] = useState<SelectModel[]>(new Array<SelectModel>());
    
    const [questionTextSelect, setQuestionTextSelect] = useState<SelectModel | null>();
    const [optionQuestionTextSelect, setOptionQuestionTextSelect] = useState<SelectModel[]>(new Array<SelectModel>());

    //#endregion

    //#region QuestionText

    const [text, setText] = useState('');
    const [textError, setTextError] = useState('');

    const [btnTextDisable, setBtnTextDisable] = useState(false);
    const [displayQuestionText, setDisplayQuestionText] = useState('none');

    const [btnText, setBtnText] = useState<string | object>();

    //#endregion

    const api = new Api();

    useEffect(() => {

        setBtnText('Adicionar');

        var cSelect = new Array<SelectModel>();

        contests.forEach(g => {
            var cSel = new SelectModel();
            cSel.label = `${g.name} - ${g.year}`;
            cSel.value = g.id;
            cSelect.push(cSel);
            
            if(question.contestId !== '' && question.contestId !== undefined && question.contestId === g.id)
            {
                setContestSelect(cSel);
            }
        });

        setOptionContestSelect(cSelect);

        var sSelect = new Array<SelectModel>();

        subjects.forEach(g => {
            var cSel = new SelectModel();
            cSel.label = g.name;
            cSel.value = g.id;
            sSelect.push(cSel);

            if(question.subjectId !== '' && question.subjectId !== undefined && question.subjectId === g.id)
            {
                setSubjectSelect(cSel);
            }
        });

        setOptionSubjectSelect(sSelect);

        if(question.subjectId !== '' && question.subjectMatterId !== '')
        {
            getSubjectMatter(question.subjectId, question.subjectMatterId);
        }

        var qtSelect = new Array<SelectModel>();

        var cSel = new SelectModel();
        cSel.label = 'Nenhum texto selecionado';
        cSel.value = '';
        qtSelect.push(cSel);

        questionTexts.forEach(g => {
            var cSel = new SelectModel();
            cSel.label = g.text;
            cSel.value = g.id;
            qtSelect.push(cSel);

            if(question.questionTextId !== '' && question.questionTextId !== undefined && question.questionTextId === g.id)
            {
                setQuestionTextSelect(cSel);
            }
        });

        setOptionQuestionTextSelect(qtSelect);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getSubjectMatter = async (subjectId: string, subjectMatterId?: string) => {
    
        await api.getSubjectMatterBySubjectId(subjectId)
            .then(res => {

                var models = res as Array<SubjectMatter>;
                
                var opSelect = new Array<SelectModel>();

                models.forEach(g => {
                    var cSel = new SelectModel();
                    cSel.label = g.name;
                    cSel.value = g.id;
                    opSelect.push(cSel);

                    if(question.subjectMatterId !== '' && question.subjectMatterId === g.id)
                    {
                        setSubjectMatterSelect(cSel);
                    }
                });

                setOptionSubjectMatterSelect(opSelect);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleSubjectSelect = (event: ValueType<SelectModel, false>) => {

        handleSetProperty('subjectId', event?.value!);
        setSubjectSelect(event);

        if(event?.value)
        {
            getSubjectMatter(event?.value!);
        }
    }

    const handleAddAlternative = () => {
        const newAlt = question.alternatives.concat(new Alternative());
        handleSetProperty('alternatives', newAlt);
    }
    
    const handleSetAlternative = (value: string, k: number) => {
        const newAlt = question.alternatives?.map((alt, index) => {
            if(k === index)
                return { ...alt, text: value, };
            else
                return alt;
        });
        handleSetProperty('alternatives', newAlt);
    }

    const handleRemoveAlternative = (k: number) => {
        const newAlt = question.alternatives?.filter((_, i) => i !== k);
        handleSetProperty('alternatives', newAlt);
    }

    const handleSetAlternativeCorrect = (k: number) => {
        const newAlt = question.alternatives?.map((alt, index) => {
            if(k === index)
                return { ...alt, isCorrect: true, };
            else
                return { ...alt, isCorrect: false, };
        });
        handleSetProperty('alternatives', newAlt);
    }

    const handleInsertImage = async (files: FileList | null) => {

        if(files && window.confirm('Deseja adicionar esta imagem?'))
        {
            for(var f of Array.from(files))
            {
                await api.insertImage(f)
                    .then(res => {

                        var imageUrl = res.data.image.fileUrl;
                        handleSetProperty('ask', question.ask + imageUrl);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    }

    const handleCheckQuestionText = () => {
        
        setDisplayQuestionText(displayQuestionText === 'none' ? 'block' : 'none');
    }

    const handleAddQuestionText = async (text: string) => {

        setBtnText(<Spinner animation="grow" variant="light" size="sm" />);
        setBtnTextDisable(true);

        var tError = Validations.validateRequiredField(text, 'texto');

        if(tError)
        {
            setTextError(tError);
            setBtnTextDisable(false);
            setBtnText('Adicionar');
        }
        else
        {
            var questionText = new QuestionText();
            questionText.text = text;
    
            await api.insertQuestionText(questionText)
                .then(res => {
                    
                    var model = res.data.model as QuestionText;
    
                    var select = new SelectModel();
                    select.label = model.text;
                    select.value = model.id;
    
                    const newModel = optionQuestionTextSelect.concat(select);

                    handleSetPropertySelect('questionTextId', select, setQuestionTextSelect);
                    setOptionQuestionTextSelect(newModel);
                    setBtnTextDisable(false);
                    setBtnText('Adicionar');
                    setDisplayQuestionText('none');
                })
                .catch(err => {
                    console.log(err);
                    setBtnTextDisable(false);
                    setBtnText('Adicionar');
                });
        }
    }

    const handleSetPropertySelect = (
            name: string, 
            event: ValueType<SelectModel, false>, 
            setSelect: React.Dispatch<React.SetStateAction<SelectModel | null | undefined>>
        ) => {
        
        handleSetProperty(name, event?.value!);
        setSelect(event);
    }

    const handleSetProperty = (name: string, value: string | boolean | Object) => {

        const newSch = questions?.map((s, i) => {
            if(s === question)
                return { ...s, [name] : value };
            else
                return s;
        });
        setQuestions!(newSch!);
    }

    const handleRemoveQuestion = () => {

        if(window.confirm(`Tem certeza que deseja remover a questão ${questions.findIndex(x => x === question) + 1}?`))
        {
            const newQuestions = questions.filter(x => x !== question);
            setQuestions(newQuestions);
        }
    }

    return (
        <Card className={`mt-1`}>
            <Card.Body>
                <div className={`${styles.div_btn_remove}`}>
                    <button
                        type='button'
                        className={`${styles.btn_remove_alternative}`} 
                        onClick={() => handleRemoveQuestion()}
                        title='Remover questão'
                    >
                        <FontAwesomeIcon icon={faMinusCircle} className={`${styles.icon_menu}`} />
                    </button>
                </div>
                <Form.Group>
                    <Form.Label className={`${styles.form_label_required}`}>
                        Concurso
                    </Form.Label>
                    <Select 
                        value={contestSelect} 
                        onChange={(e: ValueType<SelectModel, false>) => handleSetPropertySelect('contestId', e, setContestSelect)}
                        options={optionContestSelect} 
                        placeholder='Selecione o concurso' 
                        menuPlacement='bottom'
                        menuPosition='fixed'
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className={`${styles.form_label_required}`}>
                        Matéria
                    </Form.Label>
                    <Select 
                        value={subjectSelect} 
                        onChange={(e: ValueType<SelectModel, false>) => handleSubjectSelect(e)}
                        options={optionSubjectSelect} 
                        placeholder='Selecione a matéria' 
                        menuPlacement='bottom'
                        menuPosition='fixed'
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className={`${styles.form_label_required}`}>
                        Assunto
                    </Form.Label>
                    <Select 
                        value={subjectMatterSelect} 
                        onChange={(e: ValueType<SelectModel, false>) => handleSetPropertySelect('subjectMatterId', e, setSubjectMatterSelect)}
                        options={optionSubjectMatterSelect} 
                        placeholder='Selecione o assunto' 
                        menuPlacement='bottom'
                        menuPosition='fixed'
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className={`${styles.form_label}`}>
                        Texto
                    </Form.Label>
                    <Select 
                        value={questionTextSelect} 
                        onChange={(e: ValueType<SelectModel, false>) => handleSetPropertySelect('questionTextId', e, setQuestionTextSelect)}
                        options={optionQuestionTextSelect} 
                        placeholder='Selecione o texto' 
                        menuPlacement='bottom'
                        menuPosition='fixed'
                    />
                </Form.Group>

                <Form.Group controlId="formCheckbox">
                    <Form.Check type="checkbox" label="Adicionar texto" onClick={handleCheckQuestionText} />
                </Form.Group>

                <Form.Group style={{ display : displayQuestionText }}>
                    <Form.Group>
                        <Form.Label>Texto</Form.Label>
                        <Form.Control
                            placeholder="Digite o texto" 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            as='textarea'
                            rows={4}
                        />
                        <Form.Text className="text-danger">
                            {textError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <button 
                            type='button'
                            className={`${styles.btn_add}`}
                            disabled={btnTextDisable}
                            onClick={() => handleAddQuestionText(text)}
                        >
                            {btnText}
                        </button>
                    </Form.Group>
                </Form.Group>

                <div className={`row`}>
                    <div className={`col-md-6 pl-0 pr-0`}>
                        <Form.Label className={`${styles.form_label_required}`}>
                            Pergunta
                        </Form.Label>
                        <Form.Group>
                            <Form.Control
                                placeholder="Digite a pergunta" 
                                value={question.ask}
                                onChange={(e) => handleSetProperty('ask', e.target.value)}
                                className={`${styles.form_control}`}
                                as='textarea'
                                rows={4}
                            />
                        </Form.Group>

                        <div>
                            <div>
                                <button
                                    type='button'
                                    className={`${styles.btn_add_alternative}`} 
                                    onClick={() => handleAddAlternative()}
                                >
                                    + Adicionar alternativa
                                </button>
                                <label htmlFor={`file-upload-${question.id}`} className={`${styles.input_file}`}>
                                    + Adicionar imagem
                                </label>
                                <input 
                                    id={`file-upload-${question.id}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleInsertImage(e.target.files)} 
                                    multiple={false}
                                    className={`${styles.input_file}`}
                                />
                            </div>
                        </div>

                        <div>
                            {question.alternatives.map((a, k) => (
                                <div className={`d-flex flex-row mb-2`} key={k}>
                                    <Form.Control
                                        placeholder={`Alternativa ${k+1}`}
                                        value={a.text}
                                        onChange={(e) => handleSetAlternative(e.target.value, k)}
                                        className={`${styles.form_control}`}
                                        as='textarea'
                                        rows={2}
                                    />
                                    <button
                                        type='button'
                                        className={`${styles.btn_remove_alternative}`} 
                                        onClick={() => handleRemoveAlternative(k)}
                                        title='Remover alternativa'
                                    >
                                        <FontAwesomeIcon icon={faMinusCircle} className={`${styles.icon_menu}`} />
                                    </button>
                                    <button
                                        type='button'
                                        className={`
                                            ${styles.btn_incorrect_alternative} ${a.isCorrect ? styles.btn_correct_alternative : ''}
                                        `} 
                                        onClick={() => handleSetAlternativeCorrect(k)}
                                        title='Marcar alternativa correta'
                                    >
                                        <FontAwesomeIcon icon={faCheckCircle} className={`${styles.icon_menu}`} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label>
                                <input 
                                    type="checkbox"
                                    defaultChecked={question.isCanceled}
                                    onChange={() => handleSetProperty('isCanceled', !question.isCanceled)}
                                /> Questão anulada
                            </label>
                        </div>

                        <Form.Label className={`${styles.form_label}`}>
                            Solução
                        </Form.Label>
                        <Form.Group>
                            <Form.Control
                                placeholder="Digite a solução"
                                value={question.solution}
                                onChange={(e) => handleSetProperty('solution', e.target.value)}
                                className={`${styles.form_control}`}
                                as='textarea'
                                rows={3}
                            />
                        </Form.Group>
                    </div>
                    <div className={`col-md-6`}>
                        <Form.Label className={`${styles.form_label}`}>
                            Veja aqui a saída:
                        </Form.Label>

                        <div className={`border border-dark rounded p-2`}>
                            <div dangerouslySetInnerHTML={{ __html : question.ask }} style={{ whiteSpace : 'pre-line' }}></div>

                            {question.alternatives.map((a, k) => (
                                <div 
                                    key={k} 
                                    dangerouslySetInnerHTML={{ __html : `${k+1}) ${a.text}` }} style={{ whiteSpace : 'pre-line' }}
                                    className={`mt-2`}
                                ></div>
                            ))}

                            {question.alternatives.find(x => x.isCorrect) ? 
                                <div className={`text-danger mt-2`}>
                                    <small>
                                        Alternativa correta: <div dangerouslySetInnerHTML={{ __html : question.alternatives.find(x => x.isCorrect)?.text! }} style={{ whiteSpace : 'pre-line', display: 'contents', fontWeight: 'bold' }} ></div>
                                    </small>
                                </div>
                            : ''}
                        </div>

                        {question.solution ? 
                            <div className={`border border-dark rounded p-2 mt-2`}>
                                <p>Solução:</p>
                                
                                <div dangerouslySetInnerHTML={{ __html : question.solution }} style={{ whiteSpace : 'pre-line' }}></div>
                            </div>
                        : ''}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default AdminQuestionAddForm;